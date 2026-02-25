import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { LoginError } from "jsjiit";
import PublicHeader from "./PublicHeader";

// Define the form schema
const formSchema = z.object({
  enrollmentNumber: z.string({
    required_error: "Enrollment number is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export default function Login({ onLoginSuccess, onDemoLogin, w }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    isLoading: false,
    credentials: null,
  });

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enrollmentNumber: "",
      password: "",
    },
  });

  // Handle demo login
  const handleDemoLogin = () => {
    if (onDemoLogin) onDemoLogin();
  };

  // Handle side effects in useEffect
  useEffect(() => {
    if (!loginStatus.credentials) return;

    const performLogin = async () => {
      try {
        await w.student_login(loginStatus.credentials.enrollmentNumber, loginStatus.credentials.password);

        // Store credentials in localStorage
        localStorage.setItem("username", loginStatus.credentials.enrollmentNumber);
        localStorage.setItem("password", loginStatus.credentials.password);

        console.log("Login successful");
        setLoginStatus((prev) => ({
          ...prev,
          isLoading: false,
          credentials: null,
        }));
        onLoginSuccess();
      } catch (error) {
        if (
          error instanceof LoginError &&
          error.message.includes("JIIT Web Portal server is temporarily unavailable")
        ) {
          console.error("JIIT Web Portal server is temporarily unavailable");
          toast.error("JIIT Web Portal server is temporarily unavailable. Please try again later.");
        } else if (error instanceof LoginError && error.message.includes("Failed to fetch")) {
          toast.error("Please check your internet connection. If connected, JIIT Web Portal server is unavailable.");
        } else {
          console.error("Login failed:", error);
          toast.error("Login failed. Please check your credentials.");
        }
        setLoginStatus((prev) => ({
          ...prev,
          isLoading: false,
          credentials: null,
        }));
      }
    };

    setLoginStatus((prev) => ({ ...prev, isLoading: true }));
    performLogin();
  }, [loginStatus.credentials, onLoginSuccess, w]);

  // Clean form submission
  function onSubmit(values) {
    setLoginStatus((prev) => ({
      ...prev,
      credentials: values,
    }));
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black">
      {/* Header with theme toggle */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <PublicHeader showStatsButton={true} />
      </div>

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-white">Login</CardTitle>
          <CardDescription className="text-zinc-400">Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="enrollmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Enrollment Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} {...field} className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" />
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:text-foreground focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer w-full bg-rose-600 hover:bg-rose-700 text-white" disabled={loginStatus.isLoading}>
                {loginStatus.isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-zinc-500">Or</span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer w-full border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                onClick={handleDemoLogin}
                disabled={loginStatus.isLoading}
              >
                Try Demo
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
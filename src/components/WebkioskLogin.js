import React, { useState, useEffect } from 'react';
import { Lock, User, RefreshCw, AlertCircle, Wand2 } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function WebkioskLogin({ onLoginSuccess }) {
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaHidden, setCaptchaHidden] = useState(''); // Stores the secret ID
  const [captchaUrl, setCaptchaUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState('');

  // Helper: Convert Blob to Base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchCaptcha = async () => {
    try {
      setCaptcha('');
      setIsReading(true);
      setError(''); // Clear previous errors
      
      const res = await fetch(`/api/captcha?t=${Date.now()}`);
      
      if (res.ok) {
        // 1. CAPTURE THE HIDDEN ID (Crucial for Login)
        const hiddenId = res.headers.get('X-Captcha-Hidden-Id');
        if (hiddenId) {
            setCaptchaHidden(hiddenId);
            console.log("Secret ID captured:", hiddenId);
        }

        const blob = await res.blob();
        if (blob.size === 0) throw new Error("Empty captcha image");

        // 2. Show the image
        const url = URL.createObjectURL(blob);
        setCaptchaUrl(url);

        // 3. Convert to Base64 for Tesseract
        const base64Image = await blobToBase64(blob);

        // 4. AI Read (Background only - won't overwrite user)
        try {
            const result = await Tesseract.recognize(base64Image, 'eng', {
                logger: m => {} // Disable console spam
            });
            
            // Log what it found
            const text = result.data.text.replace(/[^a-zA-Z0-9]/g, '').trim();
            console.log("AI Suggestion:", text);
            
            // Optional: Uncomment to auto-fill (but it's often wrong for strike-throughs)
            // setCaptcha(text); 
        } catch (ocrErr) {
            console.warn("AI couldn't read captcha:", ocrErr);
        }
      }
    } catch (e) {
      console.error("Captcha load failed", e);
      setError("Failed to load captcha. Check internet.");
    } finally {
      setIsReading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
    // Cleanup URL object to avoid memory leaks
    return () => {
        if (captchaUrl) URL.revokeObjectURL(captchaUrl);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send Enrollment, Password, Captcha Text, AND the Secret Hidden ID
      const res = await fetch('/api/fetch-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            enrollment, 
            password, 
            captcha, 
            hidden: captchaHidden // <--- The Missing Key!
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.data);
      } else {
        setError(data.error || 'Login failed');
        // fetchCaptcha(); // <--- KEEP COMMENTED OUT to stop infinite loops!
        setCaptcha('');
      }
    } catch (err) {
      setError('Network error. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Webkiosk Login</h2>
          <p className="text-xs text-zinc-500">Securely fetch your real-time attendance.</p>
        </div>
        <button 
          onClick={fetchCaptcha} 
          className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
          title="Refresh Captcha"
        >
          <RefreshCw className={`w-4 h-4 text-zinc-400 ${isReading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* ENROLLMENT BOX */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Enrollment No." 
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            required
          />
        </div>

        {/* CAPTCHA ROW */}
        <div className="flex gap-3 items-center">
          {/* IMAGE BOX */}
          <div className="h-12 w-32 bg-white/10 rounded-xl overflow-hidden flex items-center justify-center border border-white/10 relative">
            {captchaUrl ? (
              <img 
                src={captchaUrl} 
                alt="Captcha" 
                className="h-full w-full object-contain" 
              />
            ) : (
              <div className="animate-pulse bg-white/5 w-full h-full" />
            )}
            {isReading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <Wand2 className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
            )}
          </div>
          
          {/* INPUT BOX */}
          <input 
            type="text" 
            placeholder="Enter Captcha" 
            className="flex-1 bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none tracking-widest font-mono text-center placeholder:text-zinc-600"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD BOX */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="password" 
            placeholder="Webkiosk Password" 
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Sync Attendance"}
        </button>
      </form>
      
      <p className="text-[10px] text-zinc-600 text-center mt-4">
        Enter the code exactly as shown (Case Sensitive!)
      </p>
    </div>
  );
}
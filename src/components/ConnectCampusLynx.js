import { useState } from "react";
import { Key, RefreshCw, AlertCircle } from "lucide-react";

export default function ConnectCampusLynx({ onConnect }) {
  const [token, setToken] = useState("");
  const [clientid, setClientid] = useState("JAYPEE");
  const [instituteid, setInstituteid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/fetch-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, clientid, instituteid }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Invalid session");

      onConnect(data.attendance);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5">
      <h2 className="text-lg font-bold text-white mb-1">
        Connect CampusLynx
      </h2>
      <p className="text-xs text-zinc-500 mb-4">
        Login to CampusLynx → copy token from DevTools → paste here.
      </p>

      <input
        className="w-full mb-3 bg-black/40 border border-white/10 rounded-xl p-3 text-sm"
        placeholder="JWT Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <input
        className="w-full mb-3 bg-black/40 border border-white/10 rounded-xl p-3 text-sm"
        placeholder="Institute ID"
        value={instituteid}
        onChange={(e) => setInstituteid(e.target.value)}
      />

      {error && (
        <div className="text-rose-400 text-xs flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <button
        disabled={loading}
        onClick={handleConnect}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl"
      >
        {loading ? <RefreshCw className="animate-spin" /> : "Sync Attendance"}
      </button>
    </div>
  );
}
'use client';

import { useState } from 'react';

export default function Home() {
  const [siteTitle, setSiteTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/create-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteTitle, htmlContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.siteUrl);
      setSiteTitle('');
      setHtmlContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Copied to clipboard!');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-300 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-[#111111] p-8 rounded-2xl border border-zinc-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Domain <span className="text-emerald-400">Hub</span>
        </h1>
        <p className="text-zinc-500 mb-8">Deploy static HTML sites instantly for free.</p>

        {result ? (
          <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-6 mb-6 text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-emerald-400 font-semibold mb-2">Website Created Successfully!</h2>
            <div className="flex items-center justify-center space-x-3 mt-4">
              <a 
                href={result} 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-emerald-300 underline underline-offset-4 truncate max-w-xs"
              >
                {result}
              </a>
              <button 
                onClick={copyToClipboard}
                className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-md text-white transition"
              >
                Copy
              </button>
            </div>
            <button 
              onClick={() => setResult(null)}
              className="mt-6 text-sm text-zinc-400 hover:text-white transition"
            >
              Create another site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Site Title</label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="My Awesome Website"
                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Raw HTML Content</label>
              <textarea
                required
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="<h1>Hello World</h1><style>body { background: black; color: white; }</style>"
                rows={8}
                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-y"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Deploying...' : 'Create Free Website'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
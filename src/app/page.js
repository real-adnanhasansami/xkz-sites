'use client';

import React, { useState } from 'react';
import { 
  Rocket, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  Layout, 
  Sparkles, 
  Code, 
  Monitor, 
  RefreshCw, 
  Zap, 
  Loader2, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  PlusCircle,
  Eye
} from 'lucide-react';

const TEMPLATES = {
  portfolio: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-center items-center p-6 font-sans">
  <div class="max-w-xl w-full bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md text-center">
    <div class="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
      AM
    </div>
    <h1 class="text-3xl font-extrabold tracking-tight text-white mb-2">Alex Morgan</h1>
    <p class="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">Senior Full-Stack Engineer</p>
    <p class="text-slate-400 text-sm leading-relaxed mb-6">Building distributed systems, elegant developer tools, and high-performance web applications with Next.js & Supabase.</p>
    <div class="flex justify-center gap-3">
      <a href="#" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition">View Projects</a>
      <a href="#" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-sm border border-slate-700 transition">Contact Me</a>
    </div>
  </div>
</body>
</html>`,

  bio: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Link In Bio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col items-center justify-center p-6 font-sans">
  <div class="w-full max-w-sm flex flex-col items-center space-y-4">
    <div class="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 p-1 shadow-xl shadow-emerald-500/10">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Avatar" class="w-full h-full rounded-full object-cover" />
    </div>
    <h1 class="text-xl font-bold text-white tracking-tight">@alex.creator</h1>
    <p class="text-xs text-zinc-400 text-center">Tech, Design & Digital Nomad Life 🚀</p>
    
    <div class="w-full space-y-3 pt-2">
      <a href="#" class="block w-full text-center py-3.5 px-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 rounded-xl font-medium text-sm text-zinc-200 transition shadow-sm">⚡ Latest YouTube Video</a>
      <a href="#" class="block w-full text-center py-3.5 px-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 rounded-xl font-medium text-sm text-zinc-200 transition shadow-sm">💻 Developer Setup</a>
      <a href="#" class="block w-full text-center py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20">☕ Buy Me A Coffee</a>
    </div>
  </div>
</body>
</html>`,

  soon: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Coming Soon</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center p-6 text-center font-sans">
  <div class="relative z-10 max-w-lg w-full">
    <span class="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">Launching Soon</span>
    <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">Next-Gen SaaS Platform</h1>
    <p class="text-slate-400 text-base mb-8">We are crafting the ultimate developer experience. Stay tuned.</p>
  </div>
</body>
</html>`
};

export default function Home() {
  const [siteTitle, setSiteTitle] = useState('My Awesome Project');
  const [activeTemplate, setActiveTemplate] = useState('portfolio');
  const [htmlContent, setHtmlContent] = useState(TEMPLATES.portfolio);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedSubdomain, setDeployedSubdomain] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTemplateSelect = (templateKey) => {
    setActiveTemplate(templateKey);
    setHtmlContent(TEMPLATES[templateKey]);
  };

  const handleDeploy = async () => {
    if (!htmlContent.trim()) {
      setErrorMessage('Please enter HTML content before deploying.');
      return;
    }

    setIsDeploying(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/create-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_title: siteTitle || 'My Site',
          html_content: htmlContent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.subdomain) {
        setDeployedSubdomain(data.subdomain);
      } else {
        setErrorMessage(data.error || 'Failed to deploy site.');
      }
    } catch (error) {
      setErrorMessage('Network error occurred.');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleCopyLink = () => {
    if (!deployedSubdomain) return;
    navigator.clipboard.writeText(`https://${deployedSubdomain}.xkz.vercel.app`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setDeployedSubdomain(null);
    setSiteTitle('My Awesome Project');
    setActiveTemplate('portfolio');
    setHtmlContent(TEMPLATES.portfolio);
    setCopied(false);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 font-sans relative overflow-x-hidden">
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Domain Hub</span>
          </div>
        </div>
      </header>

      {deployedSubdomain ? (
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-white mb-2">Deployment Successful! 🎉</h1>
            <p className="text-slate-400 mb-6">Your site is live at:</p>

            <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center justify-between gap-2 mb-6">
              <span className="text-emerald-400 font-mono text-sm truncate pl-2">
                https://{deployedSubdomain}.xkz.vercel.app
              </span>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied! ✓' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href={`https://${deployedSubdomain}.xkz.vercel.app`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center space-x-2"
              >
                <span>Visit Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Another</span>
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-10">
          <section className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              <span>⚡ 1,240+ Domains Generated Today</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
              Launch Your Website In 2 Seconds. <span className="text-emerald-400">100% Free.</span>
            </h1>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Site Title</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Select Template</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {['portfolio', 'bio', 'soon'].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleTemplateSelect(key)}
                      className={`py-2 text-xs font-semibold rounded-lg capitalize transition ${
                        activeTemplate === key ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {key === 'bio' ? 'Link-in-Bio' : key}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">Custom HTML Code</label>
                <textarea
                  rows={10}
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}

              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                {isDeploying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                <span>{isDeploying ? 'Deploying...' : 'Deploy to xkz.vercel.app 🚀'}</span>
              </button>
            </div>

            <div className="lg:col-span-6 flex flex-col space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Live Preview</span>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-[520px] flex flex-col">
                <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center">
                  <span className="text-xs text-slate-400 font-mono">https://preview.xkz.vercel.app</span>
                </div>
                <iframe srcDoc={htmlContent} title="Preview" className="w-full flex-1 bg-white border-none" />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

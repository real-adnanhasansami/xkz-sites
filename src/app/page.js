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
  Terminal,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Eye
} from 'lucide-react';

// Boilerplate HTML templates for fast creation
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
      <a href="#" class="block w-full text-center py-3.5 px-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 rounded-xl font-medium text-sm text-zinc-200 transition shadow-sm">💻 My Developer Setup & Gear</a>
      <a href="#" class="block w-full text-center py-3.5 px-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 rounded-xl font-medium text-sm text-zinc-200 transition shadow-sm">📩 Subscribe to Newsletter</a>
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
    <span class="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">Something Big Is Coming</span>
    <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">Next-Gen SaaS Platform</h1>
    <p class="text-slate-400 text-base mb-8">We are crafting the ultimate developer workflow experience. Drop your email below to get early access when we launch.</p>
    <form onsubmit="event.preventDefault(); alert('Subscribed successfully!');" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input type="email" placeholder="Enter your email address..." required class="flex-1 bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 transition" />
      <button type="submit" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition shrink-0 shadow-lg shadow-emerald-500/20">Notify Me</button>
    </form>
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

  // Handle template switching and populate code block
  const handleTemplateSelect = (templateKey) => {
    setActiveTemplate(templateKey);
    setHtmlContent(TEMPLATES[templateKey]);
  };

  // Handle form deployment
  const handleDeploy = async () => {
    if (!htmlContent.trim()) {
      setErrorMessage('Please enter some HTML content before deploying.');
      return;
    }

    setIsDeploying(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/create-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_title: siteTitle || 'My Site',
          html_content: htmlContent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.subdomain) {
        setDeployedSubdomain(data.subdomain);
      } else {
        setErrorMessage(data.error || 'Failed to deploy site. Please try again.');
      }
    } catch (error) {
      console.error('Deployment error:', error);
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  // Handle link copying
  const handleCopyLink = () => {
    if (!deployedSubdomain) return;
    const fullUrl = `https://${deployedSubdomain}.xkz.vercel.app`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Reset form to build another site
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
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Domain Hub
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-medium">
              v2.0
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Wildcard Edge Active</span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Docs & API
            </a>
          </div>
        </div>
      </header>

      {/* SUCCESS SCREEN STATE */}
      {deployedSubdomain ? (
        <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl text-center">
            {/* Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              Deployment Complete
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Deployment Successful! 🎉
            </h1>
            
            <p className="text-slate-400 text-base max-w-lg mx-auto mb-8">
              Your website is live on the edge network and accessible worldwide with instant wildcard SSL.
            </p>

            {/* Live Link Display Box */}
            <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 p-2.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 mb-8 shadow-inner">
              <div className="flex items-center space-x-2 px-3 py-2 w-full sm:w-auto flex-1 overflow-hidden">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-mono text-sm truncate">
                  https://{deployedSubdomain}.xkz.vercel.app
                </span>
              </div>

              <button
                onClick={handleCopyLink}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition shrink-0 ${
                  copied
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://${deployedSubdomain}.xkz.vercel.app`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition"
              >
                <PlusCircle className="w-4 h-4 text-slate-400" />
                <span>Create Another Site</span>
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* MAIN BUILDER WORKSPACE STATE */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* HERO SECTION */}
          <section className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            {/* Dynamic Glowing Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>⚡ 1,240+ Domains Generated Today</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
              Launch Your Website In 2 Seconds.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                100% Free.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Get an instant, lifetime free anonymous domain under <code className="text-emerald-400 font-mono font-medium">.xkz.vercel.app</code>. Zero setup, no credit cards required.
            </p>
          </section>

          {/* SPLIT-SCREEN WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: BUILDER FORM */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-bold text-slate-100 text-base">Site Builder</h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">HTML + Tailwind Supported</span>
              </div>

              {/* Site Title Input with Floating Label */}
              <div className="relative">
                <input
                  type="text"
                  id="siteTitle"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder=" "
                  className="block w-full px-4 pt-5 pb-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 peer transition"
                />
                <label
                  htmlFor="siteTitle"
                  className="absolute text-xs text-slate-400 duration-150 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 peer-focus:text-emerald-400"
                >
                  Site Title / Name
                </label>
              </div>

              {/* Interactive Template Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Select Template Boilerplate
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  {[
                    { id: 'portfolio', label: 'Portfolio', icon: Layout },
                    { id: 'bio', label: 'Link-in-Bio', icon: Sparkles },
                    { id: 'soon', label: 'Coming Soon', icon: Layers },
                  ].map((tpl) => {
                    const Icon = tpl.icon;
                    const isActive = activeTemplate === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleTemplateSelect(tpl.id)}
                        className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tpl.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom HTML Code Textarea */}
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Custom HTML Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setHtmlContent(TEMPLATES[activeTemplate])}
                    className="text-[11px] text-slate-500 hover:text-emerald-400 flex items-center space-x-1 transition"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Template</span>
                  </button>
                </div>

                <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden group focus-within:border-emerald-500 transition">
                  <textarea
                    rows={12}
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    placeholder="Enter raw HTML code here..."
                    className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none scrollbar-thin scrollbar-thumb-slate-800"
                    spellCheck="false"
                  />
                  <div className="absolute bottom-2 right-3 text-[10px] text-slate-600 font-mono pointer-events-none">
                    {htmlContent.length} chars
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Giant Deploy Button */}
              <button
                type="button"
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base rounded-xl shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition transform active:scale-[0.99]"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Deploying To Wildcard Edge...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>Deploy to xkz.vercel.app 🚀</span>
                  </>
                )}
              </button>
            </div>

            {/* RIGHT SIDE: REAL-TIME LIVE PREVIEW MOCKUP */}
            <div className="lg:col-span-6 flex flex-col space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Live Reactive Preview
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Auto-updates on change</span>
              </div>

              {/* Safari/Chrome Window Mockup Frame */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
                {/* Browser Top Navigation Bar */}
                <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                  {/* Window Control Buttons */}
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Browser Address Bar */}
                  <div className="flex-1 max-w-sm mx-4 bg-slate-900 border border-slate-800/80 rounded-lg py-1 px-3 flex items-center justify-center space-x-2">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-400 font-mono truncate">
                      https://{siteTitle.toLowerCase().replace(/[^a-z0-0]/g, '') || 'preview'}.xkz.vercel.app
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Live Preview Canvas iframe */}
                <div className="flex-1 w-full bg-white relative">
                  <iframe
                    srcDoc={htmlContent}
                    title="Real-Time Website Preview"
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Domain Hub Platform. Powered by Next.js App Router & Supabase.</p>
      </footer>
    </div>
  );
}
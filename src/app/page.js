'use client';

import { useState, useEffect } from 'react';
import { 
  Rocket, Copy, CheckCircle2, Terminal, ExternalLink, 
  LayoutTemplate, Zap, Shield, Globe, Database, Code2, 
  Check, Lock, Activity
} from 'lucide-react';

const TEMPLATES = {
  blank: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Site</title>\n  <style>\n    body { font-family: system-ui; background: #09090b; color: #fff; display: grid; place-items: center; height: 100vh; margin: 0; }\n    h1 { background: -webkit-linear-gradient(45deg, #10b981, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n  </style>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>`,
  portfolio: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <style>\n    body { font-family: system-ui; background: #09090b; color: #f4f4f5; text-align: center; padding: 10vh 20px; margin:0; }\n    h1 { color: #10b981; font-size: 3rem; margin-bottom: 0.5rem; }\n    p { color: #a1a1aa; font-size: 1.2rem; }\n    .btn { display: inline-block; margin-top: 2rem; padding: 12px 24px; background: #10b981; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; transition: 0.2s; }\n    .btn:hover { opacity: 0.8; }\n  </style>\n</head>\n<body>\n  <h1>Alex Developer</h1>\n  <p>Full-Stack Engineer & UI Designer</p>\n  <a href="#" class="btn">View My Work</a>\n</body>\n</html>`,
  linktree: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <style>\n    body { font-family: system-ui; background: #18181b; color: #fff; display: flex; flex-direction: column; align-items: center; padding: 3rem 1rem; margin: 0; }\n    .avatar { width: 96px; height: 96px; background: linear-gradient(45deg, #10b981, #06b6d4); border-radius: 50%; margin-bottom: 1rem; }\n    h2 { margin: 0 0 2rem 0; font-size: 1.5rem; }\n    .link { display: block; width: 100%; max-width: 400px; padding: 1rem; margin-bottom: 1rem; background: #27272a; text-align: center; border-radius: 12px; color: #fff; text-decoration: none; border: 1px solid #3f3f46; transition: 0.2s; }\n    .link:hover { border-color: #10b981; transform: translateY(-2px); }\n  </style>\n</head>\n<body>\n  <div class="avatar"></div>\n  <h2>@username</h2>\n  <a href="#" class="link">🐦 Twitter / X</a>\n  <a href="#" class="link">🐙 GitHub</a>\n  <a href="#" class="link">💼 LinkedIn</a>\n</body>\n</html>`,
  comingsoon: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <style>\n    body { font-family: system-ui; background: #000; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n    .box { text-align: center; border: 1px solid #27272a; padding: 3rem; border-radius: 24px; background: #09090b; max-width: 400px; }\n    h2 { font-size: 2rem; margin-top:0; }\n    p { color: #a1a1aa; line-height: 1.5; }\n  </style>\n</head>\n<body>\n  <div class="box">\n    <h2>🚀 Coming Soon</h2>\n    <p>We are working hard to build something amazing. Check back shortly!</p>\n  </div>\n</body>\n</html>`
};

export default function Home() {
  const [siteTitle, setSiteTitle] = useState('');
  const [activeTemplate, setActiveTemplate] = useState('blank');
  const [htmlContent, setHtmlContent] = useState(TEMPLATES.blank);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  // Auto-populate HTML when template changes
  const handleTemplateChange = (key) => {
    setActiveTemplate(key);
    setHtmlContent(TEMPLATES[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/create-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteTitle: siteTitle || 'My Free Site', htmlContent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to deploy');
      
      setResultUrl(data.siteUrl);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-emerald-500/30">
      {/* Navbar Mockup */}
      <nav className="border-b border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold text-white tracking-tight">
              Domain<span className="text-emerald-400">Hub</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#builder" className="hover:text-white transition">Builder</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-300 mb-8 backdrop-blur-sm">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span><strong className="text-white">1,240+</strong> domains generated today</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Launch Your Website In 2 Seconds. <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              100% Free.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Write your code, click deploy, and get an instant, lifetime free anonymous domain under <span className="text-zinc-200 font-mono">.xkz.vercel.app</span>
          </p>
        </div>
      </section>

      {/* Main Builder & Preview Section */}
      <section id="builder" className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        
        {resultUrl ? (
          /* SUCCESS STATE */
          <div className="w-full max-w-3xl mx-auto bg-[#111113] border border-emerald-500/30 p-10 rounded-3xl shadow-2xl shadow-emerald-900/20 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Deployment Successful! 🎉</h2>
            <p className="text-zinc-400 mb-8">Your website is now live globally on Vercel's Edge Network.</p>
            
            <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 mb-8">
              <input 
                type="text" 
                readOnly 
                value={resultUrl} 
                className="w-full bg-transparent border-none text-emerald-400 font-mono text-lg outline-none text-center md:text-left"
              />
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 whitespace-nowrap bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-lg font-medium transition w-full md:w-auto justify-center"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied! ✓' : 'Copy Link'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={resultUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 px-8 py-3.5 rounded-xl font-bold transition w-full sm:w-auto justify-center"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Website
              </a>
              <button 
                onClick={() => { setResultUrl(null); setSiteTitle(''); }}
                className="text-zinc-400 hover:text-white px-6 py-3.5 font-medium transition w-full sm:w-auto"
              >
                Create Another Site
              </button>
            </div>
          </div>
        ) : (
          /* BUILDER SPLIT SCREEN */
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* LEFT: Editor */}
            <div className="bg-[#111113] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col h-[700px]">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-zinc-300 mb-2">Site Title</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4" /> Choose a Template
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'blank', label: 'Blank' },
                    { id: 'portfolio', label: 'Portfolio' },
                    { id: 'linktree', label: 'Link-in-Bio' },
                    { id: 'comingsoon', label: 'Soon' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t.id)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition ${
                        activeTemplate === t.id 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                          : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-0 mb-6">
                <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Custom HTML Code
                </label>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full flex-1 bg-[#09090b] border border-zinc-800 rounded-xl p-4 text-emerald-300 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none custom-scrollbar"
                  placeholder="Write your HTML here..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !htmlContent}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold py-4 px-6 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Rocket className="w-5 h-5" /> Deploy to xkz.vercel.app
                  </>
                )}
              </button>
            </div>

            {/* RIGHT: Live Preview */}
            <div className="bg-[#111113] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[700px] lg:h-auto">
              {/* Browser Chrome */}
              <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-1 bg-zinc-950 rounded-md px-3 py-1.5 text-xs text-zinc-500 font-mono text-center flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  live-preview.xkz.vercel.app
                </div>
              </div>
              
              {/* iframe Preview */}
              <div className="flex-1 bg-white relative">
                <iframe
                  srcDoc={htmlContent}
                  title="Live Preview"
                  className="absolute inset-0 w-full h-full border-none"
                  sandbox="allow-scripts"
                />
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Features Grid */}
      <section id="features" className="border-y border-zinc-800/50 bg-[#09090b] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Grade. Totally Free.</h2>
            <p className="text-zinc-400">Everything you need to host static HTML instantly.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Zero Setup', desc: 'No servers to provision, no repos to connect. Just code and deploy instantly.' },
              { icon: Database, title: 'Supabase Powered', desc: 'Your raw HTML is securely stored and served globally at lightning speed.' },
              { icon: Server, title: 'Vercel Edge Network', desc: 'Leveraging Vercel\'s wildcard routing to give you dedicated subdomains.' },
              { icon: Shield, title: 'DDoS Protection', desc: 'Enterprise-grade security and SSL certificates applied automatically.' },
            ].map((feature, i) => (
              <div key={i} className="bg-[#111113] border border-zinc-800/80 p-6 rounded-2xl hover:border-emerald-500/30 transition duration-300">
                <feature.icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-zinc-400">Start for free, upgrade when you need a custom identity.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-[#111113] border border-emerald-500/40 p-8 rounded-3xl relative shadow-lg shadow-emerald-900/10">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Current Plan
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Free Forever</h3>
              <div className="text-4xl font-extrabold text-white mb-6">
                $0 <span className="text-lg font-normal text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Random 8-character subdomain', 'Unlimited deployments', 'Instant SSL / HTTPS', 'Community support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition cursor-default">
                Active Plan
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#09090b] border border-zinc-800 p-8 rounded-3xl relative opacity-80 hover:opacity-100 transition duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">Premium Pro</h3>
              <div className="text-4xl font-extrabold text-white mb-6">
                ৳100 <span className="text-lg font-normal text-zinc-500">/lifetime</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Custom named subdomain', 'e.g. yourname.xkz.vercel.app', 'Priority support', 'Edit HTML after publishing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400">
                    <CheckCircle2 className="w-5 h-5 text-zinc-600 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 font-semibold py-3 rounded-xl cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-10 text-center">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Domain Hub. A programmatic subdomain SaaS.
        </p>
      </footer>

      {/* Simple global styles for custom scrollbar in editor */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #09090b; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46; 
        }
      `}</style>
    </main>
  );
}

// Ensure lucide icon imports don't fail by stubbing Server if it wasn't extracted properly above
function Server(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  );
}

export const metadata = {
  title: 'Domain Hub | Instantly Deploy Websites',
  description: 'Create and deploy custom sites with wildcards instantly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-50 min-h-screen selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}

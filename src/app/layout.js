import './globals.css';

export const metadata = {
  title: 'My Next.js Site',
  description: 'Built with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}

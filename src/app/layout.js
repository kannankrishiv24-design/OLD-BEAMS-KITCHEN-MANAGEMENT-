import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Kitchen Hub - Old Beams Restaurant & Bar',
  description: 'A comprehensive Kitchen Management System designed as a Progressive Web App (PWA).',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

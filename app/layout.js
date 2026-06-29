import './globals.css';

export const metadata = {
  title: 'PixelStack — composants pixel-art pour ton README',
  description:
    'Stats GitHub et tech-stack en pixel art pour ton README. Réutilisable par tous.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

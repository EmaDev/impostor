import type {Metadata} from 'next';
import './globals.css';
import { Toaster as OldToaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: 'Impostor Recibida Lucía',
  description: 'Un juego para la recibida de Lucía',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased select-none">
        <div className="fixed top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-yellow-200 via-purple-300 to-blue-300"></div>
        {children}
        <OldToaster />
        <Toaster />
      </body>
    </html>
  );
}

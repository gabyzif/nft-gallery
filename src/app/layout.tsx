import SearchBar from '@/components/Search/SearchBar';
import './globals.css';
import { Inter } from 'next/font/google';
import Container from '@/components/Container/Container';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SOLANA NFT Marketplace',
  description: 'NFT Marketplace on Solana'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary-dark">{children}</body>
    </html>
  );
}

import Header from "@/components/Header";
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`bg-color-body h-dvh ${inter.className}`}>
      <Header/>
    </main>
  );
}

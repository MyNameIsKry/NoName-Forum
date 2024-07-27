"use client"
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Inter } from 'next/font/google'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ['latin'] });
library.add(fas);

export default function Home() {
  return (
    <main className={`bg-gray-900 bg w-dvw h-dvh ${inter.className} flex-1 p-4`}>
      <Header/>
      <div className="flex flex-1">
        <Sidebar/>

      </div>
    </main>
  );
}

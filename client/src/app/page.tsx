"use client"
import { Inter } from 'next/font/google'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from 'react';
import { lazy, Suspense } from "react";

const Header = lazy(() => import("@/components/Header"));
const Sidebar = lazy(() => import("@/components/Sidebar"));

const inter = Inter({ subsets: ['latin'] });
library.add(fas);

interface IUserInfo {
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  registered_at: Date;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookie = document.cookie;
        const token = cookie.split('accessToken=')[1];

        if (token) {
            const response = await axios.get<IUserInfo>(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setUserData(response.data);
        }
      } catch (err) {
        console.error("Error get userData: ", err);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <main className={`bg-gray-900 bg w-dvw h-dvh ${inter.className} flex-1 p-4`}>
      <Header userData={userData}/>
      <div className="flex flex-1">
        <Sidebar/>

      </div>
    </main>
  );
}

export default Home
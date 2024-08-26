// src/app/page.tsx
import { Inter } from 'next/font/google';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Suspense, lazy } from 'react';
import { cookies } from 'next/headers';

const Header = lazy(() => import('@/components/Header'));
const Sidebar = lazy(() => import('@/components/Sidebar'));

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

const fetchUserData = async (): Promise<IUserInfo | null> => {
  const token = getTokenFromCookies();

  if (!token) {
    return null;
  }

  try {
    const response = await axios.get<IUserInfo>(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Homeeeeeeee")
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const getTokenFromCookies = (): string | null => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  return token ? token.value : null;
};

const Home = async () => {
  const userData = await fetchUserData(); 

  return (
    <main className={`bg-gray-900 bg w-dvw h-dvh ${inter.className} flex-1 p-4`}>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header userData={userData} />
      </Suspense>
      <div className="flex flex-1">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;

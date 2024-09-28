import { Container, Box, Typography, Paper, Divider } from '@mui/material';
import Grid from "@mui/material/Grid2";
import default_avt from "../../../../public/avatar_default.jpg";
import { fetchUserData } from '@/app/(main)/layout';
import { redirect } from 'next/navigation';

interface UserProfileProps {
  params: {
    username: string;
  };
}

const UserProfile = async ({ params }: UserProfileProps) => {
  const userData = await fetchUserData(params.username);

  if (!userData?.user) {
    return redirect("/auth/login");
  }

  return (
    <div className='text-white'>
      {userData.user.display_name}
    </div>
  );
};

export default UserProfile;

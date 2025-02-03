import { Typography, Paper, Box } from '@mui/material';
import Grid from "@mui/material/Grid2";
import default_avt from "../../../../../public/avatar_default.jpg";
import { fetchUserData } from '@/app/(main)/layout';
import Image from 'next/image';
import Post from '@/components/Post';
import Bio from '../components/Bio';
import UserDetails from '../components/UserDetails';

interface UserProfileProps {
  params: {
    username: string;
  };
}

const UserProfile = async ({ params }: UserProfileProps) => {
  const userData = await fetchUserData(params.username);

  if (!userData?.user) {
    return (
      <>
        <div className='text-white text-center mt-10 text-xl'>
          Không tìm thấy người dùng này
        </div>
      </>
    )
  }

  const posts = userData.user.posts;
  const nickname = userData.user.display_name;
  const role = userData.user.role;
  const registeredDay = userData.user.registered_at;

  return (
    <div className='flex flex-col gap-4'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper className="bg-gray-800 text-white p-4 rounded-lg">
            <Grid container spacing={5} alignItems="center">
              <Grid size={6}>
                <Image 
                  src={userData.user.avatar_url || default_avt} 
                  alt="user avatar" 
                  className="rounded-full" 
                  width={100} 
                  height={100} 
                />
                <Typography variant="h6" className="text-gray-400 mt-2">
                  @{userData.user.username}
                </Typography>
              </Grid>
              <Grid size={6}>
                  <Bio userData={userData} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <UserDetails 
            nickname={nickname}
            role={role}
            post={posts.length}
            registeredDay={registeredDay}
          />
        </Grid>
      </Grid>

      {
        posts.length > 0 ? posts.map(post => (
          <Post 
            key={post.id}
            id={post.id} title={post.title} avatar_url={`${userData.user?.avatar_url || default_avt}`} category_name={post.category_name} created_at={post.created_at} author_name={post.author_name}
          />
        )) :
          <Typography className='text-white text-center mt-2'>Không có bài viết nào</Typography>
      }
    </div>
  );
};

export default UserProfile;

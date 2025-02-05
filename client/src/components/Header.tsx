'use client'
import * as React from "react";
import Link from 'next/link';
import Image from 'next/image';
import default_avt from "../../public/avatar_default.jpg";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Email, Notifications } from '@mui/icons-material';
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';

interface IUserInfoProps {
  userData: IUserInfo | null;
}

interface UserData {
  id: string;
  username: string;
  role: string;
}

const Header: React.FC<IUserInfoProps> = ({ userData }) => {
  const imgUrl = userData?.user?.avatar_url || default_avt;

  const RegisterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    padding: "12px 24px",
    fontWeight: "bold",
    backgroundColor: purple[600],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  React.useEffect(() => {
    if (typeof window !== 'undefined' && userData?.user) {
      try {
        const user: UserData = {
          id: userData.user.id,
          username: userData.user.username,
          role: userData.user.role
        };
        localStorage.setItem("user", JSON.stringify(user));
        
      } catch (error) {
        console.error("Failed to store user data:", error);
      }
    }
  }, [userData]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const data = await axios.get("/api/getRefreshToken");
    const refreshToken = data.data.refreshToken;

    if (refreshToken) {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { refreshToken: refreshToken },
        {
          withCredentials: true,
          validateStatus: (status) => true
        }
      );

      window.location.href = "/";
    }
  }

  return (
    <header className="bg-gray-800 text-white mb-5 rounded-lg sticky top-4 shadow-md z-50">
      <Toolbar>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <Link href="/">
              <h1 className='font-bold text-3xl'>LOGO</h1>
            </Link> 
          </div>
          {!userData?.user ? (
            <div className='flex items-center gap-9 font-bold'>
              <Link href="/auth/login">
                Đăng nhập
              </Link>
              <RegisterButton href='/auth/register'>
                Đăng ký
              </RegisterButton>
            </div>
          ) : (
            <div className='flex items-center gap-6 max-lg:hidden'>
              <div className='bg-input-color p-1 rounded-lg cursor-pointer'>
                <Email fontSize='medium' />
              </div>
              <div className='bg-input-color p-1 rounded-lg cursor-pointer'>
                <Notifications fontSize='medium' />
              </div>
              <div className='flex items-center bg-input-color p-2 rounded-lg gap-3 cursor-pointer'>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <Image
                    src={imgUrl}
                    alt="User's Image"
                    width={40}
                    height={40}
                    className='rounded-3xl'
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{ 
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} href={`/user/${userData.user.username}`}>
                    Hồ sơ
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/">
                    Cài đặt
                  </MenuItem>
                  <MenuItem onClick={async ()=> {handleClose();await handleLogout()}} component={Link} href="/">
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </div>
      </Toolbar>
    </header>
  );
};

export default Header;

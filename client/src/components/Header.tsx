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

interface IUserInfo {
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  registered_at: Date;
}

interface HeaderProps {
  userData: IUserInfo | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  const imgUrl = userData?.avatar_url || default_avt;

  const RegisterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    padding: "12px 24px",
    fontWeight: "bold",
    backgroundColor: purple[600],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-gray-800 text-white p-2 mb-5 rounded-lg">
      <Toolbar>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <Link href="/">
              <h1 className='font-bold text-3xl'>LOGO</h1>
            </Link> 
          </div>
          {!userData ? (
            <div className='flex items-center gap-9 font-bold'>
              <Link href="/login">
                Đăng nhập
              </Link>
              <RegisterButton href='/register'>
                Đăng ký
              </RegisterButton>
            </div>
          ) : (
            <div className='flex items-center gap-6 max-lg:hidden'>
              <div className='bg-input-color p-4 rounded-lg cursor-pointer'>
                <Email fontSize='large' />
              </div>
              <div className='bg-input-color p-4 rounded-lg cursor-pointer'>
                <Notifications fontSize='large' />
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
                    width={50}
                    height={50}
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
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Hồ sơ</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Bài viết của bạn</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Mật khẩu và bảo mật</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Điểm tương tác</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Cài đặt</Link>
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

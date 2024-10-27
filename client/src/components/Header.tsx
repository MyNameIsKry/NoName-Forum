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

interface IUserInfoProps {
  userData: IUserInfo | null;
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-gray-800 text-white mb-5 rounded-lg">
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
                <Email fontSize='large' />
              </div>
              <div className='bg-input-color p-1 rounded-lg cursor-pointer'>
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
                  <MenuItem onClick={handleClose} component={Link} href={`/user/${userData.user.username}`}>
                    Hồ sơ
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/">
                    Bài viết của bạn
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/">
                    Mật khẩu và bảo mật
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/">
                    Điểm tương tác
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/">
                    Cài đặt
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

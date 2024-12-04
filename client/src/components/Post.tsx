"use client"
import React from 'react';
import { Typography, Paper, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PostVotes from './PostVotes';

interface IPostProps {
    id: string;
    title: string;
    avatar_url: string;
    category_name: string;
    created_at: Date;
    author_name: string;
}

const ConvertToCategoryName: Record<string, string> = {
    "buon-ban": "Buôn bán",
    "tam-su": "Tâm sự",
    "cong-nghe": "Công nghệ"
};

const Post: React.FC<IPostProps> = ({ id, title, avatar_url, category_name, created_at, author_name }) => {
    const router = useRouter();

    const handleAuthorClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        router.push(`/`);
    };

    const handleCategoryClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        router.push(`/`);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); 
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); 
        setAnchorEl(null);
    };

    return (
        <Paper 
            className="bg-gray-800 text-white p-4 rounded-lg w-full h-fit cursor-pointer hover:bg-opacity-55"
            onClick={() => { router.push(`/post/${id}`) }}
        >
            <Box className="flex items-start justify-between">
                <Box className="flex items-center gap-4">
                    <Avatar alt={author_name} src={avatar_url} />
                    <Box>
                        <Typography 
                            variant="h6" 
                            className="font-bold cursor-pointer hover:underline"
                            onClick={handleAuthorClick}
                        >
                            {author_name}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenu}
                >
                    <MoreHorizIcon className='text-white'/>
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
                    Chỉnh sửa
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    Xóa bài viết
                  </MenuItem>
                </Menu>
            </Box>
            <Box className="mt-4">
                <Typography variant="h5" className="font-semibold">
                    {title}
                </Typography>
            </Box>
            <PostVotes />
            <Box>
                <Typography variant="caption" className="text-gray-400">
                        {new Date(created_at).toLocaleDateString("vi-VN")}
                </Typography>
                {" "}
                <Typography 
                    variant="caption" 
                    className="text-gray-400 cursor-pointer hover:underline"
                    onClick={handleCategoryClick}
                >
                    {ConvertToCategoryName[category_name] ?? category_name}
                </Typography>
            </Box>
        </Paper>
    );
};

export default Post;

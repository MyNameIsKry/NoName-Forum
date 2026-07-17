"use client";
import React from 'react';
import { Typography, Paper, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PostVotes from './PostVotes';
import { formatCategory } from '@/lib/categories';
import { formatRelative } from '@/lib/formatDate';

interface IPostProps {
    id: string;
    title: string;
    avatar_url?: string | null;
    category_name: string;
    created_at: string | Date;
    author_name: string;
    author_id?: string;
    score?: number;
    commentsCount?: number;
    currentUserId?: string;
}

const Post: React.FC<IPostProps> = ({
    id,
    title,
    avatar_url,
    category_name,
    created_at,
    author_name,
    author_id,
    score,
    commentsCount,
    currentUserId
}) => {
    const router = useRouter();

    const isAuthor = Boolean(currentUserId && author_id && currentUserId === author_id);

    const handleAuthorClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/user/${author_name}`);
    };

    const handleCategoryClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/category/${category_name}`);
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
                    <Avatar alt={author_name} src={avatar_url ?? undefined} />
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
                {isAuthor && (
                    <>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <MoreHorizIcon className='text-white' />
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
                    </>
                )}
            </Box>
            <Box className="mt-4">
                <Typography variant="h5" className="font-semibold">
                    {title}
                </Typography>
            </Box>
            <PostVotes score={score ?? 0} commentsCount={commentsCount ?? 0} />
            <Box>
                <Typography variant="caption" className="text-gray-400">
                    {formatRelative(created_at)}
                </Typography>
                {" "}
                <Typography
                    variant="caption"
                    className="text-gray-400 cursor-pointer hover:underline"
                    onClick={handleCategoryClick}
                >
                    {formatCategory(category_name)}
                </Typography>
            </Box>
        </Paper>
    );
};

export default Post;

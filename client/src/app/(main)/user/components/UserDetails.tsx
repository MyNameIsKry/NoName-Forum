"use client";

import React from 'react'
import { Box, Typography, Paper } from "@mui/material";
import { useEdit } from '@/app/hooks/useEdit';

type UserDetailsProps = {
    nickname: string;
    role: string;
    post: number;
    registeredDay: Date;
}

const UserDetails = ({ nickname, role, post, registeredDay }: UserDetailsProps) => {
  return (
    <Paper className="bg-gray-800 text-white p-4 rounded-lg h-full flex items-center">
        <Box>
            <Typography variant="body1">Nickname: {nickname}</Typography>
            <Typography variant="body1">Vai trò: {role}</Typography>
            <Typography variant="body1">Số bài viết đã đăng: {post}</Typography>
            <Typography variant="body1">Số điểm: 0</Typography>
            <Typography variant="body1">
            Ngày tạo tài khoản: {new Date(registeredDay).toLocaleDateString("vi-VN")}
            </Typography>
        </Box>
    </Paper>
  )
}

export default UserDetails;
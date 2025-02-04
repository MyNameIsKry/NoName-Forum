"use client";

import { useEffect, useState } from "react";
import { Stack, Paper, Typography, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { purple } from "@mui/material/colors";
import axios from "axios";

interface IRepliesComment {
  id: string;
  author_name: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

interface IComment {
  id: string;
  author_name: string;
  content: string;
  replies?: IRepliesComment[];
  created_at: Date;
  updated_at: Date;
}

const CommentItem = ({ comment, level = 0 }: { comment: IComment; level?: number }) => {
  return (
    <Stack spacing={1} sx={{ ml: level * 4 }}>
      <Paper sx={{ p: 2, borderRadius: 2 }} className="bg-gray-800">
        <Typography variant="subtitle2" color="primary">
          {comment.author_name}
        </Typography>
        <Typography variant="body2" color="white">
          {comment.content}
        </Typography>
      </Paper>

      {comment.replies &&
        comment.replies.map((reply) => <CommentItem key={reply.id} comment={reply} level={level + 1} />)}
    </Stack>
  );
};

const PostComment = ({ postId }: { postId: string }) => {
  const [inputComment, setInputComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get<IComment[]>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`, {
        withCredentials: true,
        validateStatus: (status) => true,
      });
      setComments(res.data);
    } catch (error) {
      console.error("Lỗi khi get comments", error);
    }
  };

  const createComment = async (content: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`,
        { content },
        {
          withCredentials: true,
          validateStatus: (status) => true,
        }
      );
      setInputComment("");
      fetchComments(); 
    } catch (error) {
      console.error("Lỗi khi post comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "66%", marginTop: "10px" }}>
      <Paper
        component="form"
        elevation={4}
        sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2 }}
        className="bg-gray-800"
        onSubmit={(e) => {
          e.preventDefault();
          createComment(inputComment);
        }}
      >
        <IconButton type="submit">
          <SendIcon sx={{ color: purple[600] }} />
        </IconButton>
        <Divider sx={{ height: 28, mx: 1, borderColor: "gray" }} orientation="vertical" />
        <InputBase
          sx={{ flex: 1, color: "white" }}
          placeholder="Comment gì đó đi..."
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
      </Paper>
      <Stack spacing={2}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Stack>
    </Stack>
  );
};

export default PostComment;

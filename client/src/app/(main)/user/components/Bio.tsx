"use client";

import React from 'react'
import { Typography, IconButton, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { CustomButton } from '@/components/Button';
import { grey, purple } from "@mui/material/colors"
import axios from 'axios';

const Bio = ({ content }: { content: string  | null; }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [bio, setBio] = React.useState<string>("");

  const handleClose = () => {
    setEdit(false);
    setBio("");
  };
  const handleOpen = () => setEdit(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/me/bio`, 
      {
        bio: bio,
      },
      {
        withCredentials: true,
        validateStatus: (status) => true
      }
    );
    handleClose();
    console.log(data);
  }

  return (
      <div className='mt-2'>
        {
          edit ? 
            <Box
              component={"form"}
              onSubmit={handleSubmit}
            >
              <TextField
                className='w-2/3 h-14'
                label="Nhập mô tả"
                type="text"
                variant="filled"
                required
                margin="normal"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                InputProps={{
                  style: {
                    color: 'black', 
                    backgroundColor: 'white', 
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'black', 
                  },
                  }}
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white', 
                      '&:hover': {
                        backgroundColor: 'white', 
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white', 
                      },
                      '&:before': {
                        borderBottomColor: 'gray', 
                        borderBottomWidth: '2px'
                      },
                      '&:after': {
                        borderBottomColor: purple[600], 
                        borderBottomWidth: '4px'
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',   
                    },
                }}
              /> 
              <div className='flex gap-2'>
                <CustomButton 
                  padding='3px 6px'
                  type='submit'
                >Lưu</CustomButton>
                <CustomButton 
                  padding='3px 6px' backgroundcolor={grey[600]} hoverbackgroundcolor={grey[700]}
                  onClick={handleClose}
                >Hủy</CustomButton>
              </div>
            </Box>
          :
          <Typography variant="body1" className="mt-2"> 
            {content || "Không có mô tả"} {" "} <IconButton aria-label='edit' className='text-white' onClick={handleOpen}><EditIcon/></IconButton>
          </Typography>
        }
      </div>
    )
}

export default Bio;
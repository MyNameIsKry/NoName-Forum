"use client";

import React from 'react'
import { Typography, IconButton, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { CustomButton } from '@/components/Button';
import { grey, purple } from "@mui/material/colors"
import { useEdit } from '@/app/hooks/useEdit';
import Notification from '@/components/Notification';
import { compareUserId, getUserDataFromLocalStorage } from '@/Utils/Helpers';

interface IUserProps {
  userData: IUserInfo;
}

const Bio: React.FC<IUserProps> = ({ userData }) => {
  const { content, edit, success, notiContent, noti, handleSubmit, setContent, toggleEdit, handleNoti } = useEdit(userData.user?.bio || "Không có mô tả", 'bio');
  
  const userIdFromLocalStrg = getUserDataFromLocalStorage();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
      <div className='mt-2'>
        {
          noti &&
          <Notification
            message={notiContent}
            onClose={handleNoti}
            open={noti}
            severity={success ? "success" : "error"}
          />
        }
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                  onClick={() => toggleEdit(false)}
                >Hủy</CustomButton>
              </div>
            </Box>
          :
          <Typography variant="body1" className="mt-2"> 
            {content}{" "} 
            {mounted && compareUserId(userIdFromLocalStrg?.id, userData) && (
              <span>
                <IconButton aria-label="edit" className="text-white" onClick={() => toggleEdit(true)}>
                  <EditIcon />
                </IconButton>
              </span>
            )}
          </Typography>
        }
      </div>
    )
}

export default Bio;
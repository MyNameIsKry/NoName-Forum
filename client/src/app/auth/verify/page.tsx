'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, ButtonProps } from '@mui/material';
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import Link from 'next/link';
import axios from 'axios';

const VerifyPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [count, setCount] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (count <= 0) return; 

    const intervalId = setInterval(() => {
      setCount((prevCount: number) => prevCount - 1);
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [count]);

  const handleFocus = (index: number, direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? index + 1 : index - 1;
    if (newIndex >= 0 && newIndex < inputRefs.current.length) {
      inputRefs.current[newIndex]?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      handleFocus(index, 'next');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      handleFocus(index, 'prev');
    }
  };

  const handleOTP = async () => {
    let optStr = '';
    otp.forEach(i => {
      optStr += i;
    })  

    try {
      const data = window.sessionStorage.getItem("user_register_data");
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, otp);

      console.log(data);
      console.log(res);
    } catch(err) {
      console.error(err);
    }
  }

  const ConfirmButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    width: "100%",
    height: "40px",
    backgroundColor: purple[600],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
        <Box 
            component={'form'}
            className="w-full max-w-md p-6 sm:p-8 space-y-6 sm:space-y-8 bg-gray-800 rounded-lg shadow-primary-boxShadow"
        >
        <h1 className='text-white w-full text-center text-xl sm:text-2xl'>
          Nhập mã xác nhận vào bên dưới
        </h1>
        <h1 className='text-white w-full text-center text-xl sm:text-2xl'>{count}s</h1>
        <div className="flex justify-center space-x-2 sm:space-x-5">
          {otp.map((_, index) => (
            <div key={index}>
              <label htmlFor={`code-${index + 1}`} className="sr-only">
                {`Code ${index + 1}`}
              </label>
              <input
                type="text"
                maxLength={1}
                id={`code-${index + 1}`}
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                ref={(el) => {(inputRefs.current[index] = el)}}
                className="block w-10 h-10 sm:w-12 sm:h-12 text-center text-sm font-extrabold text-white border rounded-lg focus:ring-purple-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-purple-600"
                required
              />
            </div>
          ))}
        </div>
        <ConfirmButton onClick={handleOTP}>Xác nhận</ConfirmButton>
        <p id="helper-text-explanation" className="mt-4 text-sm text-center dark:text-gray-400">
          Hãy nhập 6 chữ số chúng tôi đã gửi qua email của bạn
        </p>
        <p className="mt-4 text-sm text-center dark:text-gray-400">Không nhận được mã? <Link className="underline dark:text-purple-500" href="">Gửi lại</Link></p>
      </Box>
    </div>
  );
};

export default VerifyPage;

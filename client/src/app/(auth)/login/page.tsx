"use client"
import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface ILogin {
  email: string;
  password: string;  
}

const LoginPage = () => {
  const [formData, setFormData] = useState<ILogin>(
    {
      email: "",
      password: ""
    }
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData, {
        withCredentials: true,
        validateStatus: (status) => true
      })

      if (res.data.status >= 400) {
        setErrorMessage(res.data.error);
        return;
      }
      else {
        router.push("/");
      }
    } catch(err) {
      setErrorMessage("Internal server error")
    }
  };

  const SignInButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    width: "100%",
    height: "40px",
    backgroundColor: purple[600],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (
    <div className="flex items-center justify-center min-h-screen">
        <Box
          component={"form"}
          className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-primary-boxShadow mx-5"
          onSubmit={handleSubmit}
        > 
            <h2 className="text-2xl font-bold text-center text-white">Đăng nhập</h2>
            <p className="text-center text-red-600">{errorMessage}</p>
            <TextField
              label="Email"
              type="email"
              variant="filled"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData,  email: e.target.value})}
              InputProps={{
                style: {
                  color: 'black', 
                  backgroundColor: 'white',
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'grey',
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
            <TextField
              label="Mật khẩu"
              type="password"
              variant="filled"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData,  password: e.target.value})}
              InputProps={{
                style: {
                  color: 'black', 
                  backgroundColor: 'white', 
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'grey', 
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
            <SignInButton type="submit" >Đăng nhập</SignInButton>
            <p className="text-white">
            Quên mật khẩu ?
          </p>
          <p className="text-white">
            Người mới ? <Link href="/register" className="text-white underline">Tạo tài khoản</Link>
          </p>
          <div className="flex items-center w-full">
            <hr className="h-px bg-neutral-500 border-none m-0 w-1/2"/>
            <span className="mx-2 text-neutral-200">Hoặc</span>
            <hr className="h-px bg-neutral-500 border-none m-0 w-1/2"/>
          </div>
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/google`}>
            <div className="w-full h-fit bg-white relative p-2 rounded-3xl flex items-center mt-3">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c size-5"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
              <span className="font-bold text-md text-center w-full">Đăng nhập với google</span>
            </div>
          </Link>
        </Box>
    </div>
  )
}


export default LoginPage;
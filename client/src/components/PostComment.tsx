import { IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { purple } from "@mui/material/colors";

const PostComment = () => {

    return (
        <Box 
            component={"form"}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            className="w-2/3"
        >
            <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={2}
                placeholder="Comment gì đó đi..."
                sx={{
                '& .MuiInputBase-root': {
                    width: '30vw',
                },
                '& .css-9yqzd6-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: purple[600],
                    borderWidth: "2px"
                },
                '& .MuiFormLabel-root': {
                    color: "white"
                },
                '& .MuiInputBase-input': {
                    color: "white"
                },
                }}
                focused
            />
            <button className="text-white bg-white">SEND</button>
        </Box>
    )
};

export default PostComment;

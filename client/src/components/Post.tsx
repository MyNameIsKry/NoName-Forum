import { Typography, Paper, Box, Avatar, IconButton } from '@mui/material';
import Image from 'next/image';
import UpVote from "../../public/UpVote.svg";
import DownVote from "../../public/DownVote.svg"
import ModeCommentIcon from '@mui/icons-material/ModeComment';

interface IPostProps {
    title: string;
    avatar_url: string;
    category_name: string;
    created_at: Date;
    author_name: string;
}

const ConvertToCategoryName: Record<string, string> = {
    "buon-ban": "Buôn bán",
    "tam-su": "Tâm sự",
};

const Post: React.FC<IPostProps> = ({ title, avatar_url, category_name, created_at, author_name }) => {
    return (
        <Paper className="bg-gray-800 text-white p-4 rounded-lg w-full h-fit">
            <Box className="flex items-start justify-between">
                <Box className="flex items-center gap-4">
                    <Avatar alt={author_name} src={avatar_url} />
                    <Box>
                        <Typography variant="h6" className="font-bold">
                            {author_name}
                        </Typography>
                        <Typography variant="caption" className="text-gray-400">
                            {new Date(created_at).toLocaleDateString("vi-VN")}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="caption" className="text-gray-400">
                    {ConvertToCategoryName[category_name] ?? category_name}
                </Typography>
            </Box>
            <Box className="mt-4">
                <Typography variant="h5" className="font-semibold">
                    {title}
                </Typography>
            </Box>
            <Box className="flex items-center gap-1 mt-4 text-white">
                <IconButton>
                    <Image src={UpVote} priority alt="UpVote image" width={20} height={20}/>
                </IconButton>
                <Typography variant="body2">1</Typography>
                <IconButton>
                    <Image src={DownVote} priority alt="DownVote image" width={20} height={20}/>
                </IconButton>
                <IconButton>
                    <ModeCommentIcon className='text-white'/>
                </IconButton>
            </Box>
            
        </Paper>
    );
};

export default Post;

import { Typography, Paper, Box } from '@mui/material';

interface IPostProps {
    title: string;
    avatar_url: String;
    category_name: string;
    created_at: Date;
}

const ConvertToCategoryName: Record<string, string> = {
    "buon-ban": "Buôn bán",
    "tam-su": "Tâm sự",
}

const Post: React.FC<IPostProps> = ({ title, avatar_url, category_name, created_at }) => {
    return (
        <Paper className="bg-gray-800 text-white p-4 rounded-lg w-full h-fit">
            <Box className="flex items-center justify-between">
            <Box>
                <Typography variant="h5" className="flex gap-2">
                    <img 
                        src={`${avatar_url}`} 
                        alt="user avatar" 
                        className="rounded-full" 
                        width={30} 
                        height="auto" 
                    />
                    {title}
                </Typography>
                <Box className="flex gap-2 mt-2">
                    <span className="text-xs bg-red-500 bg-opacity-50 p-1 rounded">Tâm sự</span> 
                    <span className="text-xs bg-black bg-opacity-50 p-1 rounded">Buôn bán</span>
                    <span className="text-xs bg-black bg-opacity-50 p-1 rounded">Con Cac</span>
                </Box>
            </Box>
            <Typography variant="caption">{ConvertToCategoryName[category_name]} • {new Date(created_at).toLocaleDateString("vi-VN")}</Typography>
            </Box>
        </Paper>
    )
}

export default Post;
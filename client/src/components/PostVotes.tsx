import UpVote from "../../public/UpVote.svg";
import DownVote from "../../public/DownVote.svg";
import Image from "next/image";
import { IconButton, Typography, Box } from "@mui/material";
import ModeCommentIcon from '@mui/icons-material/ModeComment';

interface PostVotesProps {
    score: number;
    commentsCount: number;
}

const PostVotes: React.FC<PostVotesProps> = ({ score, commentsCount }) => {
    return (
        <Box className="flex items-center gap-2 mt-4">
            <IconButton className="flex items-center gap-1 px-3 py-2" disabled>
                <Image src={DownVote} priority alt="DownVote image" width={20} height={20} />
            </IconButton>
            <Typography variant="body2" className="text-white min-w-[2ch] text-center">
                {score}
            </Typography>
            <IconButton className="flex items-center gap-1 px-3 py-2" disabled>
                <Image src={UpVote} priority alt="UpVote image" width={20} height={20} />
            </IconButton>
            <IconButton disabled>
                <ModeCommentIcon className='text-white' />
            </IconButton>
            <Typography variant="body2" className="text-white min-w-[2ch] text-center">
                {commentsCount}
            </Typography>
        </Box>
    );
};

export default PostVotes;

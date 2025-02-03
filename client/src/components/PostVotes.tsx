import UpVote from "../../public/UpVote.svg";
import DownVote from "../../public/DownVote.svg"
import Image from "next/image";
import { IconButton } from "@mui/material";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Box from '@mui/material/Box';

const PostVotes = () => {
    return (
        <Box className="flex items-center gap-2 mt-4">
            <IconButton className="flex items-center gap-1 px-3 py-2">
                <Image src={DownVote} priority alt="DownVote image" width={20} height={20}/>
            </IconButton>
            <IconButton className="flex items-center gap-1 px-3 py-2">
                <Image src={UpVote} priority alt="DownVote image" width={20} height={20}/>
            </IconButton>
            <IconButton>
                <ModeCommentIcon className='text-white'/>
            </IconButton>
        </Box>
    )
};

export default PostVotes;

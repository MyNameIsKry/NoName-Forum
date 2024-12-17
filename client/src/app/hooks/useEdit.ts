import { useState } from "react"
import axios from "axios";

type endpointType = "display_name" | "bio";

export const useEdit = (initialContent: string, endpointType: endpointType) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [content, setContent] = useState<string>(initialContent);

    const handleOpen = () => {
        setEdit(!edit);
        setContent("");
    };

    const handleClose = () => {
        setEdit(!edit);
        setContent(initialContent);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = endpointType === "bio" ? { bio: content } : { displayName: content };

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/me/${endpointType}`, 
            body,
            {
                withCredentials: true,
                validateStatus: (status) => true
            }
        );

        setEdit(false);
    }

    return {
        handleOpen,
        handleClose,
        handleSubmit,
        setContent,
        content,
        edit
    }
}
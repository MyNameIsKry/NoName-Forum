import { useState, useReducer } from "react"
import axios from "axios";
import { getUserDataFromLocalStorage } from "@/Utils/Helpers";

type endpointType = "display_name" | "bio";

interface State {
    edit: boolean;
    content: string;
    success: boolean;
    noti: boolean;
    notiContent: string;
}

type Action =
    { type: "TOGGLE_EDIT"; isOpen: boolean }
  | { type: "SET_CONTENT"; content: string }
  | { type: "SET_SUCCESS_AND_NOTI"; success: boolean, content: string }
  | { type: "SET_NOTI"; noti: boolean}

type BodyType = { 
    bio: string;
} | { 
    displayName: string; 
};

const initialState: State = {
    edit: false,
    content: "",
    success: false,
    noti: false,
    notiContent: ""
}

const reducer = (state: State, action: Action) : State => {
    switch (action.type) {
        case "TOGGLE_EDIT": 
            return {
                ...state,
                edit: action.isOpen,
                content: action.isOpen ? "" : state.content,
            };
        
        case "SET_CONTENT":
            return {
                ...state,
                content: action.content
            };
        
        case "SET_SUCCESS_AND_NOTI":
            return {
                ...state,
                success: action.success,
                notiContent: action.content,
            };
        
        case "SET_NOTI":
            return {
                ...state,
                noti: action.noti
            }
    }
}

const createBody = (content: string, endpointType: endpointType): BodyType => {
    console.log(getUserDataFromLocalStorage());
    if (endpointType === "bio") {
      return { 
        bio: content 
    };
    } else {
      return { displayName: content };
    }
};

export const useEdit = (initialContent: string, endpointType: endpointType) => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        content: initialContent,
      });

    const toggleEdit = (isOpen: boolean) => {
        dispatch({ type: "TOGGLE_EDIT", isOpen });
        if (!isOpen) dispatch({ type: "SET_CONTENT", content: initialContent });
    };

    const handleNoti = () => dispatch({ type: "SET_NOTI", noti: !state.noti });

    const handleNotiMessage = (content: string, success: boolean) => dispatch({ type: "SET_SUCCESS_AND_NOTI", content, success });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const body = createBody(state.content, endpointType);
    
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/me/${endpointType}`, 
                body,
                {
                    withCredentials: true,
                    validateStatus: (status) => true
                }
            ).then(() => {
                handleNoti();
                handleNotiMessage("Chỉnh sửa thành công", true);
                toggleEdit(false);
                //window.location.reload();
            }).catch(() => {
                handleNotiMessage("Đã có lỗi xảy ra", false);
            })

        } catch (err) {
            dispatch({ type: "SET_SUCCESS_AND_NOTI", content: "Đã có lỗi xảy ra", success: false });
        }

    }

    return {
        ...state,
        setContent: (content: string) => dispatch({ type: "SET_CONTENT", content }),
        toggleEdit,
        handleSubmit,
        handleNoti
    }
}
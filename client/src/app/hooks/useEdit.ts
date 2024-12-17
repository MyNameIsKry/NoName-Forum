import { useState, useReducer } from "react"
import axios from "axios";

type endpointType = "display_name" | "bio";

interface State {
    edit: boolean;
    content: string;
    success: boolean;
    error: string | null;
}

type Action =
    { type: "TOGGLE_EDIT"; isOpen: boolean }
  | { type: "SET_CONTENT"; content: string }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SET_SUCCESS"; success: boolean };

type BodyType = { bio: string } | { displayName: string };

const initialState: State = {
    edit: false,
    content: "",
    error: null,
    success: false
}

const reducer = (state: State, action: Action) : State => {
    switch (action.type) {
        case "TOGGLE_EDIT": 
            return {
                edit: action.isOpen,
                content: action.isOpen ? "" : state.content,
                error: null,
                success: false,
            };
        
        case "SET_CONTENT":
            return {
                ...state,
                content: action.content
            };
        
        case "SET_SUCCESS":
            return {
                ...state,
                success: true
            };
        
        case "SET_ERROR":
            return {
                ...state,
                error: action.error,
                success: false
            }
    }
}

const createBody = (content: string, endpointType: endpointType): BodyType => {
    if (endpointType === "bio") {
      return { bio: content };
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "SET_ERROR", error: null });

        try {
            const body = createBody(state.content, endpointType);
    
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/me/${endpointType}`, 
                body,
                {
                    withCredentials: true,
                    validateStatus: (status) => true
                }
            );
    
            dispatch({ type: "SET_SUCCESS", success: true });
            toggleEdit(false);

        } catch (err) {
            dispatch({ type: "SET_ERROR", error: err as string || "Đã xảy ra lỗi" });
        }
    }

    return {
        ...state,
        setContent: (content: string) => dispatch({ type: "SET_CONTENT", content }),
        toggleEdit,
        handleSubmit,
    }
}
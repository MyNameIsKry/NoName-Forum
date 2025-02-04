"use client"
import { useState } from 'react';
import { CustomButton } from '@/components/Button';
import Notification from '@/components/Notification';
import axios from "axios";

type CreatePost = {
    title: string;
    content: string;
    categoryName: string;
}

type Noti = {
    status: NotiType;
    message: string;
}

const CreateNewPost = () => {
    const [notiMessage, setNotiMessage] =  useState<Noti | null>(null);
    const [createPost, setCreatePost] = useState<CreatePost>({
        title: "",
        content: "",
        categoryName: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { title, content, categoryName } = createPost;

        if (categoryName.length === 0)
            setNotiMessage({
                status: "error",
                message: "Bạn chưa chọn danh mục cho bài đăng"
            });
        else {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, createPost, {
                    withCredentials: true,
                    validateStatus: (status) => true
                  })
                  console.log(res.data);
                  if (res.status >= 400) {
                    setNotiMessage(res.data.error);
                    return;
                  } 

                  if (res.status == 201)  {
                    setNotiMessage({
                        status: "success",
                        message: "Đăng bài thành công"
                    })
                    setCreatePost({
                        title: "",
                        content: "",
                        categoryName: ""
                    })
                  }
            } catch {
                setNotiMessage({
                    status: "error",
                    message: "Internal server error"
                });
            }
        }
    };

    const handleCloseNoti = () => {
        setNotiMessage(null);
    }

    return (
        <div className="text-white bg-gray-800 p-6 rounded-lg w-2/3">
            {
                notiMessage && 
                <Notification
                    message={notiMessage.message}
                    onClose={handleCloseNoti}
                    open={notiMessage ? true : false}
                    severity={notiMessage.status}
                />
            }
            <h1 className="font-bold text-2xl mb-4">Tạo 1 bài viết mới</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <select
                    name="category"
                    value={createPost.categoryName}
                    onChange={(e) => setCreatePost({ ...createPost, categoryName: e.target.value })}
                    className="w-1/4 p-2 rounded bg-gray-700 text-white"
                >
                    <option value="">Chọn danh mục</option>
                    <option value="buon-ban">Buôn bán</option>
                    <option value="tam-su">Tâm sự</option>
                    <option value="cong-nghe">Công nghệ</option>
                </select>

                <input
                    type="text"
                    name="title"
                    placeholder="Nhập tiêu đề bài viết"
                    required
                    value={createPost.title}
                    onChange={(e) => setCreatePost({ ...createPost, title: e.target.value })}
                    className="p-2 rounded bg-gray-700 text-white"
                />
                
                <textarea
                    name="content"
                    required
                    placeholder="Nhập nội dung bài viết"
                    value={createPost.content}
                    onChange={(e) => setCreatePost({ ...createPost, content: e.target.value })}
                    className="p-2 rounded bg-gray-700 text-white"
                    rows={4}
                />  
                <CustomButton type='submit'>
                    Đăng bài
                </CustomButton>
            </form>
        </div>
    );
};

export default CreateNewPost;

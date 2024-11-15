"use client"
import { useState } from 'react';
import { CustomButton } from '@/components/Button';
import Notification from '@/components/Notification';

type CreatePost = {
    title: string;
    content: string;
    category: string;
}

const CreateNewPost = () => {
    const [errorMessage, setErrorMessage] =  useState<string | null>(null);
    const [createPost, setCreatePost] = useState<CreatePost>({
        title: "",
        content: "",
        category: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, content, category } = createPost;
        if (category.length === 0)
            setErrorMessage("Bạn chưa chọn danh mục cho bài đăng");

        console.log({ title, content, category });
    };

    const handleCloseNoti = () => {
        setErrorMessage(null);
    }

    return (
        <div className="text-white bg-gray-800 p-6 rounded-lg w-2/3">
            {
                errorMessage && 
                <Notification
                    message={errorMessage}
                    onClose={handleCloseNoti}
                    open={errorMessage ? true : false}
                    severity='error'
                />
            }
            <h1 className="font-bold text-2xl mb-4">Tạo 1 bài viết mới</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <select
                    name="category"
                    value={createPost.category}
                    onChange={(e) => setCreatePost({ ...createPost, category: e.target.value })}
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
                    value={createPost.title}
                    onChange={(e) => setCreatePost({ ...createPost, title: e.target.value })}
                    className="p-2 rounded bg-gray-700 text-white"
                />
                
                <textarea
                    name="content"
                    placeholder="Nhập nội dung bài viết"
                    value={createPost.content}
                    onChange={(e) => setCreatePost({ ...createPost, content: e.target.value })}
                    className="p-2 rounded bg-gray-700 text-white"
                    rows={5}
                />
                <CustomButton type='submit'>
                    Đăng bài
                </CustomButton>
            </form>
        </div>
    );
};

export default CreateNewPost;

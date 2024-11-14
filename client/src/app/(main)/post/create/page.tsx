"use client"
import { useState } from 'react';

const CreateNewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, content, category });
    };

    return (
        <div className="text-white bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
            <h1 className="text-center font-bold text-2xl mb-4">Tạo 1 bài viết mới</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Nhập tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white"
                />
                
                <textarea
                    name="content"
                    placeholder="Nhập nội dung bài viết"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white"
                    rows={5}
                ></textarea>
                
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white"
                >
                    <option value="">Chọn danh mục</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>

                <button type="submit" className="p-2 bg-blue-600 rounded hover:bg-blue-700">
                    Đăng bài
                </button>
            </form>
        </div>
    );
};

export default CreateNewPost;

import Link from 'next/link';

const CategoryNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Danh mục không tồn tại.</h2>
            <Link href="/" className="text-purple-400 hover:underline">
                Về trang chủ
            </Link>
        </div>
    );
};

export default CategoryNotFound;

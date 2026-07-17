import { formatCategory } from '@/lib/categories';

const PostTitle = ({ category_name, title }: { category_name: string; title: string }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold mb-4 bg-purple-500 p-1 rounded-lg">
          {formatCategory(category_name)}
        </span>
        <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
      </div>
    </>
  );
}

export default PostTitle;

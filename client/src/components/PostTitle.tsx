

const PostTitle = ({ category_name, title }: { category_name: string; title: string }) => {
    const ConvertToCategoryName: Record<string, string> = {
        "buon-ban": "Buôn bán",
        "tam-su": "Tâm sự",
        "cong-nghe": "Công nghệ"
    };
    
  return (
    <>  
        <div className="flex items-center gap-2">
            <span className="text-xl font-bold mb-4 bg-purple-500 p-1 rounded-lg">
                {ConvertToCategoryName[category_name]}
            </span>
            <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
        </div>
    </>
  )
}

export default PostTitle;
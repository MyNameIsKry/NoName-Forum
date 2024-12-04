type PostContentProps = {
    content: string;
};

const PostContent = ({ content }: PostContentProps) => (
    <div className="text-white">
        <p>{content}</p>
    </div>
);

export default PostContent;

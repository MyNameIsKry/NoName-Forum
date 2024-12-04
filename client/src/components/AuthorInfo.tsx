type AuthorInfoProps = {
    avatar_url: string;
    author_name: string;
    created_at: Date;
};

const AuthorInfo = ({ avatar_url, author_name, created_at }: AuthorInfoProps) => (
    <div className="flex items-center gap-3">
        <img src={avatar_url} alt={author_name} className="w-12 h-12 rounded-full" />
        <div>
            <p className="font-medium text-white">{author_name}</p>
            <p className="text-sm text-gray-600">
                {new Date(created_at).toLocaleDateString()}
            </p>
        </div>
    </div>
);

export default AuthorInfo;

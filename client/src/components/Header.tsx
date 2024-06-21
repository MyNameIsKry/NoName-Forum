import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-primary-color text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            Logo
          </Link> 
        </div>
        <div className='flex items-center gap-9 font-bold'>
          <Link href="/login">
            Đăng nhập
          </Link>
          <Link 
            href="/register" 
            className='bg-[#FF6934] hover:bg-opacity-80 transition duration-200 py-3 px-6 rounded-md'  
          >
            Đăng kí
          </Link>
        </div>
        {/* font xấu vcl */}
      </div>
    </header>
  );
};

export default Header;

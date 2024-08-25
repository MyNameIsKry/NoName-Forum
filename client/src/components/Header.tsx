import Link from 'next/link';
import { faBell, faCaretDown, faMessage, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from 'next/image';
import default_avt from "../../public/avatar_default.jpg";

interface IUserInfo {
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  registered_at: Date;
}

interface HeaderProps {
  userData: IUserInfo | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  const imgUrl = userData?.avatar_url || default_avt;
  const displayName = userData?.display_name;
  
  return (
    <header className="bg-gray-800 text-white py-4 px-10 mb-5 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <Link href="/">
            <h1 className='font-bold text-3xl'>LOGO</h1>
          </Link> 
        </div>
        {
          !userData &&
          <div className='flex items-center gap-9 font-bold'>
            <Link href="/login">
              Đăng nhập
            </Link>
            <Link 
              href="/register" 
              className='bg-purple-600 hover:bg-opacity-80 transition duration-200 py-3 px-6 rounded-md'  
            >
              Đăng kí
            </Link>
          </div>
        }
        {
          userData &&
          <>
            <div className='flex items-center gap-6 max-lg:hidden'>
              <div className='bg-input-color p-4 rounded-lg'>
                <FontAwesomeIcon icon={faMessage} className='h-6 w-6' />
              </div>
              <div className='bg-input-color p-4 rounded-lg'>
                <FontAwesomeIcon icon={faBell} className='h-6 w-6' />  
              </div>
              <div className='flex items-center bg-input-color p-2 rounded-lg gap-3 cursor-pointer'>
                <div className='border-none rounded-3xl'>
                  <Image
                    src={imgUrl}
                    alt="User's Image"
                    width={54}
                    height={54}
                    className='rounded-3xl'
                  />
                </div>
                <h1 className='font-bold text-xl'>{displayName}</h1>
                <FontAwesomeIcon icon={faCaretDown} className='h-5 w-5' />  
              </div>
            </div>
          </> 
        }
      </div>
    </header>
  );
};

export default Header;

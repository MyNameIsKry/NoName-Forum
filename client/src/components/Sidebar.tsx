import React from 'react'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 p-4 w-72 text-white rounded-xl h-fit">
      <nav>
        <ul>
          <li className="mb-4"><a href="/">Trang chủ</a></li>
          <li className="mb-4"><a href="/">Tâm sự chuyện đời</a></li>
          <li className="mb-4"><a href="/">Mua bán</a></li>
        </ul>
        <div className="mt-6">
          <button className="bg-purple-600 text-white py-2 px-2 rounded flex items-center gap-1 w-full justify-center hover:bg-opacity-80 transition duration-200">Tạo bài viết mới 
            <FontAwesomeIcon icon={faArrowRight} className='h-4 w-4' />  
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar;
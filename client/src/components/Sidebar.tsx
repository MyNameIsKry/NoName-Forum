'use client'

import React from 'react'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomButton } from './Button';

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
          <CustomButton href='/post/create'>
            Tạo bài viết mới <FontAwesomeIcon icon={faArrowRight} className='h-4 w-4' /> 
          </CustomButton>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar;
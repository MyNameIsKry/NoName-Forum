'use client';

import React from 'react';
import Link from 'next/link';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomButton } from './Button';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 p-4 w-72 text-white rounded-xl h-fit fixed">
      <nav>
        <ul>
          <li className="mb-4"><Link href="/">Trang chủ</Link></li>
          <li className="mb-4"><Link href="/category/tam-su">Tâm sự chuyện đời</Link></li>
          <li className="mb-4"><Link href="/category/buon-ban">Mua bán</Link></li>
        </ul>
        <div className="mt-6">
          <CustomButton href='/post/create'>
            Tạo bài viết mới <FontAwesomeIcon icon={faArrowRight} className='h-4 w-4' />
          </CustomButton>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

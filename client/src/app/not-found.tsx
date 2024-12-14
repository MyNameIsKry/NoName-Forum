"use client"
import { CustomButton } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <div className="bg-[#8e24aa] px-4 py-2 text-sm rounded mt-2 shadow-md uppercase tracking-wider">
        Không tìm thấy trang
      </div>
      <p className="mt-6 text-lg max-w-md text-center">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đã thay đổi tên hoặc tạm thời không khả dụng.      </p>
      <CustomButton href="/" className="mt-8">
        Về trang chủ
      </CustomButton>
    </div>
  );
}

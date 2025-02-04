<h1 align="center">NoName Forum</h1>

<h1>Vietnamese</h1>

## Tổng quan
- Một dự án diễn đàn có tên "NoName" - nền tảng thảo luận mở và tương tác cộng đồng.
- Được bắt đầu vào ngày **27 tháng 5 năm 2024** và được viết bởi chính tôi - sinh viên năm 1.

## Mô tả
NoName-Forum là một ứng dụng diễn đàn web cho phép người dùng tạo, chia sẻ và tham gia thảo luận về nhiều chủ đề khác nhau. (Dựa trên ý tưởng của Reddit và Facebook).

## Tính năng
- [x] Đăng ký và xác thực người dùng (oauth2 google, otp code)
- [x] Tạo các chủ đề thảo luận và xem
- [ ] Hệ thống trả lời và bình luận
- [x] Hồ sơ người dùng
- [x] Thay đổi thông tin cá nhân
- [ ] Phân loại chủ đề
- [ ] Chức năng tìm kiếm

## Công nghệ sử dụng
### Frontend: 
* NextJs
* MUI
* Tailwind CSS,
* FontAwesome

### Backend: 
- NodeJs
- Fastify

### Database: 
* Sqlite3
* Prisma

## Cài đặt
1. Clone về
```bash
git clone https://github.com/MyNameIsKry/NoName-Forum.git
```
2. Cài đặt `npm i` ở 2 folder `client` và `server`.
3. Cấu hình file `.env`.
```
 DATABASE_URL="file:./dev.db"
 JWT_ACCESS_SECRET=
 JWT_REFRESH_SECRET=
 JWT_ACCESS_TOKEN_EXPIRES_IN=
 JWT_REFRESH_TOKEN_EXPIRES_IN=
 COOKIE_SECRET=
 SESSION_SECRET=
 GOOGLE_CLIENT_ID=
 GOOGLE_CLIENT_SECRET=
 GMAIL_USER=
 PASS_GMAIL_USER=
```
4. Chạy ứng dụng:
- Client side: `cd client` => `npm run dev`.
- Server side: `cd server` => `npm start`.

## Đóng góp
Project này thật sự chưa hoàn thiện, nếu có đóng góp gì cho project này, mọi người cứ thoải mái tạo **Pull Request**.

## Giấy phép
Dự án này được cấp phép theo [LICENSE](./LICENSE).

## Liên hệ
Đối với mọi thắc mắc, vui lòng mở issue.

<h1>English</h1>

## Overview
* A forum project named "NoName" - an open discussion platform and community interaction.

* Started on May 27, 2024, and written by myself - a first-year student.

## Description
NoName-Forum is a web forum application that allows users to create, share, and participate in discussions on various topics. (Based on the ideas of Reddit and Facebook).

## Features
- [x] User registration and authentication (Google OAuth2, OTP code)
- [x] Create and view discussion threads
- [ ] Reply and comment system
- [x] User profile
- [x] Update personal information
- [ ] Topic categorization
- [ ] Search functionality


## Technology Stack
### Frontend:
- NextJs
- MUI
- Tailwind CSS
- FontAwesome

### Backend:
- NodeJs
- Fastify

### Database:
- Sqlite3
- Prisma

## Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/NoName-Forum.git
```
2. Install dependencies `npm i` in both the `client` and `server` folders.
3. Configure `.env` file
4. Run the application:
- Client side: `cd client` => `npm run dev`
- Server side: `cd server` => `npm start`.

## Contributing
This project is still under development, and if you have any contributions, feel free to create a **Pull Request**.

## License
This project is licensed under [LICENSE](./LICENSE).

## Contact
For any inquiries, please open an issue.

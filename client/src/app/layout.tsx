import "./globals.css"

export default async function RootLayout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <html lang="en">
        <body className='bg-gray-900 p-4'>
            {children}
        </body>
      </html>
    );
  }
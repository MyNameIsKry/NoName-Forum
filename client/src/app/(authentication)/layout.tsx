import "../globals.css"

export default async function AuthLayout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <html lang="en">
        <body className={`bg-gray-900`}>
            {children}
        </body>
      </html>
    );
  }
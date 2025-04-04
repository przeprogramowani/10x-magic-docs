import {ReactNode} from "react";
import {Link, useLocation} from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm'>
        <div className='container mx-auto p-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
            <h1 className='text-2xl font-bold text-blue-600'>
              ✨ Magic Docs by 10xDevs
            </h1>
            <nav className='mt-4 sm:mt-0'>
              <ul className='flex space-x-6'>
                <li>
                  <Link
                    to='/'
                    className={`text-sm font-medium ${isActive("/") ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/github-actions'
                    className={`text-sm font-medium ${isActive("/github-actions") ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
                  >
                    GitHub Actions
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className='container mx-auto px-4 py-8'>{children}</main>
      <footer className='bg-white border-t mt-12 py-6'>
        <div className='container mx-auto px-4 text-center text-gray-500'>
          <p>© {new Date().getFullYear()} 10xDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

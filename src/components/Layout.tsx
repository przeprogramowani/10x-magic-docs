import {ReactNode} from "react";
import {Link} from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <div className='min-h-screen bg-[#1a1a1a] text-gray-100'>
      <header className='bg-[#242424] border-b border-gray-800'>
        <div className='container mx-auto p-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
            <h1 className='text-2xl font-semibold'>
              <Link
                to='/'
                className='text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2'
              >
                <span className='text-2xl'>✨</span>
                <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  Magic Docs by 10xDevs
                </span>
              </Link>
            </h1>
            <nav className='mt-4 sm:mt-0'>
              <ul className='flex space-x-6'>
                <li>
                  <Link
                    to='/'
                    className='text-gray-300 hover:text-blue-400 transition-colors'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/components'
                    className='text-gray-300 hover:text-blue-400 transition-colors'
                  >
                    Components
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className='container mx-auto px-4 py-8'>{children}</main>
      <footer className='bg-[#242424] border-t border-gray-800 mt-12 py-6'>
        <div className='container mx-auto px-4 text-center text-gray-400'>
          <p>© {new Date().getFullYear()} 10xDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

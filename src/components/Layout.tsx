import {ReactNode} from "react";
import {Link} from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <div className='min-h-screen bg-[#1a1a1a] text-gray-100 flex flex-col'>
      <header className='bg-[#242424] border-b border-gray-800 sticky top-0 z-50'>
        <div className='container max-w-7xl mx-auto p-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to='/github-actions'>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      GitHub Actions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to='/docker'>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Docker
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>
      <main className='flex-1 flex flex-col'>
        <div className='container max-w-7xl mx-auto px-4 py-8 flex-1'>
          {children}
        </div>
      </main>
      <footer className='bg-[#242424] border-t border-gray-800 py-6'>
        <div className='container max-w-7xl mx-auto px-4 text-center text-gray-400'>
          <p>© {new Date().getFullYear()} 10xDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

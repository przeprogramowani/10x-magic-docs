import { ReactNode } from "react";
import TopBar from "./TopBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 flex flex-col transition-colors">
      <header className="bg-neutral-50 dark:bg-[#242424] border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 transition-colors">
        <div className="container max-w-7xl mx-auto p-4">
          <TopBar />
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <div className="container max-w-7xl mx-auto px-4 py-8 flex-1">{children}</div>
      </main>
      <footer className="bg-neutral-50 dark:bg-[#242424] border-t border-neutral-200 dark:border-neutral-800 py-6 transition-colors">
        <div className="container max-w-7xl mx-auto px-4 text-center text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} 10xDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

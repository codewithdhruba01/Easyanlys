
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, X } from 'lucide-react';
import { XIcon } from './svg/XIcon';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Follower', href: '/follower-counter' },
  { name: 'README', href: '/readme-designer' },
  { name: 'Text2README', href: '/text-to-readme' },
  { name: 'Analysis', href: '/following-analysis' },
  { name: 'Compare', href: '/profile-compare' },
];

export function Navbar() {
  const pathname = useLocation().pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md py-4 px-6 border-b border-border/20">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex justify-start">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden">
              <img src="/assets/logo.webp" alt="Easyanlys Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-lg tracking-wide text-foreground">
              Easyanlys
            </span>
          </Link>
        </div>

        {/* Center side: Links (Desktop) */}
        <div className="hidden md:flex justify-center items-center space-x-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                to={item.href}
                className={cn(
                  "text-xs font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center justify-end space-x-4 sm:space-x-6 text-muted-foreground">
          <a href="https://x.com/codewithdhruba" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" aria-label="X (Twitter)">
            <XIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          
          <div className="hover:text-foreground transition-colors flex items-center justify-center">
            <ThemeToggle />
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground hover:text-muted-foreground transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-2 border-t border-border/40 mt-3 flex flex-col gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-muted text-foreground font-semibold" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
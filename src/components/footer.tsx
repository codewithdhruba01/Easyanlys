import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-background py-12 px-6 mt-auto border-t border-border/20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-4">
        
        {/* Left side: Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center justify-center md:justify-start space-x-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full overflow-hidden">
              <img src="/assets/logo.webp" alt="Easyanlys Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-[15px] tracking-wide text-foreground">
              Easyanlys
            </span>
          </Link>
        </div>

        {/* Center: Navigate */}
        <div className="flex-[2] flex flex-col items-center gap-4">
          <h4 className="font-medium text-sm text-foreground tracking-wide uppercase">Navigate</h4>
          <div className="flex flex-col gap-3">
            <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <Link to="/follower-counter" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Follower</Link>
              <Link to="/readme-designer" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">.md Designer</Link>
              <Link to="/text-to-readme" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Text to README</Link>
              <Link to="/following-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Analysis</Link>
              <Link to="/profile-compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Compare</Link>
            </nav>
          </div>
        </div>

        {/* Right side: Credits */}
        <div className="flex-1 flex justify-center md:justify-end">
          <p className="text-sm text-muted-foreground">
            Made by <a href="https://codewithdhruba.in" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors font-medium">@codewithdhruba</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
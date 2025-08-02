import React from 'react';
import { Search, Zap, Info, BookOpen } from 'lucide-react';

const NavigationHeader: React.FC = () => {
  const navItems = [
    { name: 'Home', href: '#', icon: Search },
    { name: 'Examples', href: '#examples', icon: BookOpen },
    { name: 'About', href: '#about', icon: Info }
  ];

  return (
    <header className="relative z-10 w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gradient">
                AI Search Agent
              </h1>
              <p className="text-xs text-text-secondary hidden sm:block">
                Intelligent Web Search & Content Discovery
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 text-text-secondary hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  );
};

export default NavigationHeader;
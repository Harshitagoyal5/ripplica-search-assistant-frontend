import React, { useState, useEffect } from 'react';
import { Search, Mic, Clock, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  validationStatus?: 'valid' | 'invalid' | null;
}

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading, validationStatus }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { toast } = useToast();

  const suggestions = [
    "Best restaurants in Tokyo with Michelin stars",
    "Latest AI developments in 2024",
    "How to build a sustainable business model",
    "Top programming languages for web development",
    "Climate change impact on marine ecosystems"
  ];

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      onSearch(query.trim());
      toast({
        title: "Search submitted",
        description: "Processing your query with AI...",
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const getValidationIcon = () => {
    if (validationStatus === 'valid') return <Check className="w-5 h-5 text-success" />;
    if (validationStatus === 'invalid') return <X className="w-5 h-5 text-error" />;
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeInUp">
      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="glass-card relative overflow-hidden animate-glow">
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-primary flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything... (e.g., 'Best restaurants in Tokyo')"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg focus:outline-none"
              disabled={isLoading}
              autoFocus
            />
            <div className="flex items-center gap-3">
              {getValidationIcon()}
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title="Voice search (coming soon)"
              >
                <Mic className="w-5 h-5" />
              </button>
              <Button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Character Count */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className={`${query.length > 200 ? 'text-warning' : 'text-text-secondary'}`}>
              {query.length}/500 characters
            </span>
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-text-secondary hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Suggestions */}
      {!isLoading && query.length === 0 && (
        <div className="space-y-4 animate-slideInLeft">
          <h3 className="text-lg font-semibold text-foreground mb-4">Try these examples:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="glass-card text-left hover:border-primary/50 hover:shadow-[var(--shadow-glow-primary)] transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-primary group-hover:text-primary-glow transition-colors" />
                  <span className="text-text-secondary group-hover:text-foreground transition-colors">
                    {suggestion}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {!isLoading && recentSearches.length > 0 && query.length === 0 && (
        <div className="mt-8 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="px-4 py-2 bg-surface rounded-full text-text-secondary hover:text-foreground hover:bg-surface-secondary transition-all duration-300 border border-transparent hover:border-primary/30"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHero;
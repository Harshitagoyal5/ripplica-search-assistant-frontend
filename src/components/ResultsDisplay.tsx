import React from 'react';
import { Check, X, Clock, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchResult {
  query: string;
  isValid: boolean;
  processingTime: number;
  response?: string;
  sources?: string[];
  error?: string;
  suggestions?: string[];
}

interface ResultsDisplayProps {
  result: SearchResult | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading }) => {
  const { toast } = useToast();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Result has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-scaleIn">
        <div className="glass-card">
          {/* Loading Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Processing your query...</h3>
              <p className="text-text-secondary">Searching the web and analyzing results</p>
            </div>
          </div>

          {/* Loading Progress */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-text-secondary">Validating query structure...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-text-secondary">Searching web sources...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-text-secondary">Analyzing and synthesizing results...</span>
            </div>
          </div>

          {/* Skeleton Content */}
          <div className="mt-8 space-y-4">
            <div className="h-4 bg-surface rounded-lg animate-pulse" />
            <div className="h-4 bg-surface rounded-lg animate-pulse w-3/4" />
            <div className="h-4 bg-surface rounded-lg animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeInUp">
      <div className="glass-card">
        {/* Result Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${result.isValid ? 'bg-success/20' : 'bg-error/20'}`}>
              {result.isValid ? (
                <Check className="w-6 h-6 text-success" />
              ) : (
                <X className="w-6 h-6 text-error" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Search Results
              </h3>
              <p className="text-text-secondary text-sm">
                Query: "{result.query}"
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  result.isValid ? 'status-success' : 'status-error'
                }`}>
                  {result.isValid ? 'Valid Query' : 'Invalid Query'}
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Clock className="w-4 h-4" />
                  {result.processingTime}ms
                </div>
              </div>
            </div>
          </div>
          
          {result.response && (
            <button
              onClick={() => handleCopy(result.response!)}
              className="btn-secondary flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          )}
        </div>

        {/* Result Content */}
        {result.isValid && result.response ? (
          <div className="space-y-6">
            {/* Main Response */}
            <div className="bg-surface/50 rounded-lg p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Response</h4>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                  {result.response}
                </p>
              </div>
            </div>

            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  Sources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-surface/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-3 group"
                    >
                      <ExternalLink className="w-4 h-4 text-primary group-hover:text-primary-glow transition-colors" />
                      <span className="text-text-secondary group-hover:text-foreground transition-colors truncate">
                        {source}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Error State */
          <div className="space-y-6">
            <div className="bg-error/10 border border-error/30 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-error mb-2">Query Validation Failed</h4>
                  <p className="text-text-secondary leading-relaxed">
                    {result.error || "Your query could not be processed. Please try rephrasing with more specific details."}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            {result.suggestions && result.suggestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">Suggested Improvements</h4>
                <div className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-surface/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-text-secondary">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
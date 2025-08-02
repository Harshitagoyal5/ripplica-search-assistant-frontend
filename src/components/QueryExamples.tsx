import React from 'react';
import { Check, X, MapPin, Code, Coffee, Lightbulb, TrendingUp, Book } from 'lucide-react';

interface ExampleQuery {
  query: string;
  category: string;
  icon: React.ReactNode;
  isValid: boolean;
  explanation: string;
}

interface QueryExamplesProps {
  onExampleClick: (query: string) => void;
}

const QueryExamples: React.FC<QueryExamplesProps> = ({ onExampleClick }) => {
  const examples: ExampleQuery[] = [
    {
      query: "Best Japanese restaurants in San Francisco with outdoor seating",
      category: "Travel & Food",
      icon: <MapPin className="w-5 h-5" />,
      isValid: true,
      explanation: "Specific location, cuisine type, and feature - perfect for web search"
    },
    {
      query: "Latest React 18 features and migration guide",
      category: "Technology",
      icon: <Code className="w-5 h-5" />,
      isValid: true,
      explanation: "Current tech topic with actionable information request"
    },
    {
      query: "How do I feel better?",
      category: "General",
      icon: <Coffee className="w-5 h-5" />,
      isValid: false,
      explanation: "Too vague - lacks context and specific intent"
    },
    {
      query: "Sustainable business models for startups in 2024",
      category: "Business",
      icon: <TrendingUp className="w-5 h-5" />,
      isValid: true,
      explanation: "Timely, specific topic with clear business focus"
    },
    {
      query: "Machine learning algorithms for natural language processing",
      category: "AI & ML",
      icon: <Lightbulb className="w-5 h-5" />,
      isValid: true,
      explanation: "Technical topic with specific application area"
    },
    {
      query: "What's the weather?",
      category: "General",
      icon: <Coffee className="w-5 h-5" />,
      isValid: false,
      explanation: "Missing location context - too generic for useful results"
    },
    {
      query: "Python data visualization libraries comparison 2024",
      category: "Programming",
      icon: <Code className="w-5 h-5" />,
      isValid: true,
      explanation: "Comparative analysis with current year context"
    },
    {
      query: "Best books for learning quantum physics fundamentals",
      category: "Education",
      icon: <Book className="w-5 h-5" />,
      isValid: true,
      explanation: "Educational goal with specific subject matter"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gradient mb-4">
          Query Examples
        </h2>
        <p className="text-text-secondary text-lg">
          Learn what makes a great search query with these examples
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className={`glass-card group cursor-pointer transition-all duration-300 hover:scale-105 ${
              example.isValid 
                ? 'hover:border-success/50 hover:shadow-[0_0_40px_theme(colors.success/30)]' 
                : 'hover:border-error/50 hover:shadow-[0_0_40px_theme(colors.error/30)]'
            }`}
            onClick={() => onExampleClick(example.query)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${example.isValid ? 'bg-success/20' : 'bg-error/20'}`}>
                  {example.icon}
                </div>
                <div>
                  <span className="text-sm font-medium text-text-secondary">
                    {example.category}
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                example.isValid ? 'status-success' : 'status-error'
              }`}>
                {example.isValid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {example.isValid ? 'Valid' : 'Invalid'}
              </div>
            </div>

            {/* Query Text */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                "{example.query}"
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {example.explanation}
              </p>
            </div>

            {/* Try Button */}
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                example.isValid
                  ? 'bg-success/20 text-success hover:bg-success/30 border border-success/30'
                  : 'bg-surface text-text-secondary hover:bg-surface-secondary border border-border'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onExampleClick(example.query);
              }}
            >
              {example.isValid ? 'Try this query' : 'See why this fails'}
            </button>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-12 glass-card">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          Tips for Better Queries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Good Practices
            </h4>
            <ul className="space-y-2 text-text-secondary">
              <li>• Be specific about location, time, or context</li>
              <li>• Include relevant details and constraints</li>
              <li>• Use current year for timely information</li>
              <li>• Specify the type of information you need</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-error mb-2 flex items-center gap-2">
              <X className="w-4 h-4" />
              Avoid These
            </h4>
            <ul className="space-y-2 text-text-secondary">
              <li>• Vague or overly broad questions</li>
              <li>• Single word queries without context</li>
              <li>• Personal questions without specifics</li>
              <li>• Ambiguous terms that could mean many things</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryExamples;
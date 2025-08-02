import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import SearchHero from '@/components/SearchHero';
import QueryExamples from '@/components/QueryExamples';
import ResultsDisplay from '@/components/ResultsDisplay';
import AnimatedBackground from '@/components/AnimatedBackground';
import StatusBar from '@/components/StatusBar';
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

const Index = () => {
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalQueries, setTotalQueries] = useState(0);
  const [averageResponseTime, setAverageResponseTime] = useState(0);
  const { toast } = useToast();

  // Hardcoded queries for demo
  const validQueries = {
    // Delhi queries
    "best places to visit in delhi": {
      summary: "Delhi offers rich historical and cultural attractions. Top places include Red Fort, Qutub Minar, Humayun's Tomb, India Gate, Lotus Temple, Jama Masjid, and Chandni Chowk for street food. Museums like National Museum and cultural hubs like Dilli Haat are also popular.",
      sources: [
        "https://www.tripadvisor.in/Attractions-g304551-Activities-Delhi.html",
        "https://www.holidify.com/places/delhi/sightseeing-and-things-to-do.html",
        "https://www.thrillophilia.com/places-to-visit-in-delhi",
        "https://traveltriangle.com/blog/places-to-visit-in-delhi/",
        "https://www.nomadicmatt.com/travel-guides/india-travel-tips/delhi/"
      ]
    },
    "top tourist attractions in delhi": {
      summary: "Delhi offers rich historical and cultural attractions. Top places include Red Fort, Qutub Minar, Humayun's Tomb, India Gate, Lotus Temple, Jama Masjid, and Chandni Chowk for street food. Museums like National Museum and cultural hubs like Dilli Haat are also popular.",
      sources: [
        "https://www.tripadvisor.in/Attractions-g304551-Activities-Delhi.html",
        "https://www.holidify.com/places/delhi/sightseeing-and-things-to-do.html",
        "https://www.thrillophilia.com/places-to-visit-in-delhi",
        "https://traveltriangle.com/blog/places-to-visit-in-delhi/",
        "https://www.nomadicmatt.com/travel-guides/india-travel-tips/delhi/"
      ]
    },
    "i am in delhi what are the best places to visit": {
      summary: "Delhi offers rich historical and cultural attractions. Top places include Red Fort, Qutub Minar, Humayun's Tomb, India Gate, Lotus Temple, Jama Masjid, and Chandni Chowk for street food. Museums like National Museum and cultural hubs like Dilli Haat are also popular.",
      sources: [
        "https://www.tripadvisor.in/Attractions-g304551-Activities-Delhi.html",
        "https://www.holidify.com/places/delhi/sightseeing-and-things-to-do.html",
        "https://www.thrillophilia.com/places-to-visit-in-delhi",
        "https://traveltriangle.com/blog/places-to-visit-in-delhi/",
        "https://www.nomadicmatt.com/travel-guides/india-travel-tips/delhi/"
      ]
    },
    // Weather queries
    "weather in new york today": {
      summary: "Current weather in New York City: 29°C, mostly sunny. Humidity at 54%, wind at 12 km/h. No rain forecast today. Tonight's temperature is expected to drop to 22°C.",
      sources: [
        "https://weather.com/weather/today/l/New+York+NY",
        "https://www.accuweather.com/en/us/new-york/10007/weather-forecast/349727",
        "https://forecast.weather.gov/MapClick.php?lat=40.7146&lon=-74.0071"
      ]
    },
    "current temperature in nyc": {
      summary: "Current weather in New York City: 29°C, mostly sunny. Humidity at 54%, wind at 12 km/h. No rain forecast today. Tonight's temperature is expected to drop to 22°C.",
      sources: [
        "https://weather.com/weather/today/l/New+York+NY",
        "https://www.accuweather.com/en/us/new-york/10007/weather-forecast/349727",
        "https://forecast.weather.gov/MapClick.php?lat=40.7146&lon=-74.0071"
      ]
    },
    "nyc weather update": {
      summary: "Current weather in New York City: 29°C, mostly sunny. Humidity at 54%, wind at 12 km/h. No rain forecast today. Tonight's temperature is expected to drop to 22°C.",
      sources: [
        "https://weather.com/weather/today/l/New+York+NY",
        "https://www.accuweather.com/en/us/new-york/10007/weather-forecast/349727",
        "https://forecast.weather.gov/MapClick.php?lat=40.7146&lon=-74.0071"
      ]
    },
    // Programming queries
    "best programming languages to learn in 2025": {
      summary: "Top programming languages in 2025 include Python (AI/ML, automation), JavaScript (frontend & full-stack), TypeScript (scalable web apps), Go (cloud & distributed systems), Rust (systems programming, WebAssembly), and Kotlin (Android development). Demand is driven by cloud-native and AI growth.",
      sources: [
        "https://www.geeksforgeeks.org/best-programming-languages-to-learn-in-2025/",
        "https://www.freecodecamp.org/news/most-popular-programming-languages/",
        "https://insights.stackoverflow.com/survey/2024"
      ]
    },
    "top programming languages in demand 2025": {
      summary: "Top programming languages in 2025 include Python (AI/ML, automation), JavaScript (frontend & full-stack), TypeScript (scalable web apps), Go (cloud & distributed systems), Rust (systems programming, WebAssembly), and Kotlin (Android development). Demand is driven by cloud-native and AI growth.",
      sources: [
        "https://www.geeksforgeeks.org/best-programming-languages-to-learn-in-2025/",
        "https://www.freecodecamp.org/news/most-popular-programming-languages/",
        "https://insights.stackoverflow.com/survey/2024"
      ]
    },
    "most popular coding languages 2025": {
      summary: "Top programming languages in 2025 include Python (AI/ML, automation), JavaScript (frontend & full-stack), TypeScript (scalable web apps), Go (cloud & distributed systems), Rust (systems programming, WebAssembly), and Kotlin (Android development). Demand is driven by cloud-native and AI growth.",
      sources: [
        "https://www.geeksforgeeks.org/best-programming-languages-to-learn-in-2025/",
        "https://www.freecodecamp.org/news/most-popular-programming-languages/",
        "https://insights.stackoverflow.com/survey/2024"
      ]
    }
  };

  const invalidQueries = [
    "walk my pet tomorrow",
    "add apples to grocery",
    "remind me to call mom",
    "buy groceries"
  ];

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setCurrentResult(null);
    const startTime = Date.now();

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const processingTime = Date.now() - startTime;
    const normalizedQuery = query.toLowerCase().trim();

    // Update stats
    setTotalQueries(prev => prev + 1);
    setAverageResponseTime(prev => {
      if (prev === 0) return processingTime;
      return Math.round((prev + processingTime) / 2);
    });

    // Check if it's an invalid query
    if (invalidQueries.includes(normalizedQuery)) {
      const result: SearchResult = {
        query,
        isValid: false,
        processingTime,
        error: "Query validation failed: This appears to be a personal task or reminder rather than a web search query.",
        suggestions: [
          "Try searching for factual information",
          "Ask about current events or research topics", 
          "Look for how-to guides or tutorials",
          "Search for reviews or comparisons"
        ]
      };

      setCurrentResult(result);
      toast({
        title: "Query validation failed",
        description: "Please try rephrasing your query",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check for valid hardcoded queries
    const matchedQuery = validQueries[normalizedQuery as keyof typeof validQueries];
    
    if (matchedQuery) {
      const result: SearchResult = {
        query,
        isValid: true,
        processingTime,
        response: matchedQuery.summary,
        sources: matchedQuery.sources
      };

      setCurrentResult(result);
      toast({
        title: "Search completed",
        description: `Found results in ${processingTime}ms`,
      });
    } else {
      // No results found
      const result: SearchResult = {
        query,
        isValid: false,
        processingTime,
        response: "No results found.",
        error: "No matching results found for your query. Try one of the suggested examples below."
      };

      setCurrentResult(result);
      toast({
        title: "No results found",
        description: "Try rephrasing your query",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <NavigationHeader />
        
        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6 animate-fadeInUp">
                AI Search Agent
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                Intelligent Web Search & Content Discovery
              </p>
              <p className="text-lg text-text-muted max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Experience the future of web search with AI-powered query validation, 
                intelligent content analysis, and lightning-fast results.
              </p>
            </div>
          </section>

          {/* Search Interface */}
          <section className="mb-16">
            <SearchHero 
              onSearch={handleSearch}
              isLoading={isLoading}
              validationStatus={currentResult?.isValid === true ? 'valid' : currentResult?.isValid === false ? 'invalid' : null}
            />
          </section>

          {/* Results */}
          {(currentResult || isLoading) && (
            <section className="mb-16">
              <ResultsDisplay 
                result={currentResult}
                isLoading={isLoading}
              />
            </section>
          )}

          {/* Examples Section */}
          {!currentResult && !isLoading && (
            <section id="examples" className="mb-16">
              <QueryExamples onExampleClick={handleSearch} />
            </section>
          )}

          {/* About Section */}
          <section id="about" className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="glass-card animate-fadeInUp">
                <h2 className="text-3xl font-display font-bold text-gradient mb-6">
                  About AI Search Agent
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Smart Validation</h3>
                    <p className="text-text-secondary">
                      Our AI validates your queries in real-time, ensuring optimal search results 
                      by analyzing query structure, intent, and specificity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Web Intelligence</h3>
                    <p className="text-text-secondary">
                      Advanced web scraping and content analysis powered by machine learning 
                      algorithms to deliver the most relevant and accurate information.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Lightning Fast</h3>
                    <p className="text-text-secondary">
                      Optimized for speed with intelligent caching, parallel processing, 
                      and efficient data synthesis for sub-second response times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <StatusBar 
          totalQueries={totalQueries}
          averageResponseTime={averageResponseTime}
        />
      </div>
    </div>
  );
};

export default Index;
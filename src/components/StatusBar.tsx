import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Clock, Search, TrendingUp } from 'lucide-react';

interface StatusBarProps {
  totalQueries?: number;
  averageResponseTime?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ totalQueries = 0, averageResponseTime = 0 }) => {
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check API status
    const checkApiStatus = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('http://localhost:8000/health', {
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        setApiStatus(response.ok ? 'connected' : 'disconnected');
      } catch (error) {
        setApiStatus('disconnected');
      }
    };

    checkApiStatus();
    const statusInterval = setInterval(checkApiStatus, 30000); // Check every 30 seconds

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-error';
      default: return 'text-warning';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected': return 'API Connected';
      case 'disconnected': return 'API Offline';
      default: return 'Checking...';
    }
  };

  const StatusIcon = () => {
    if (apiStatus === 'connected') return <Wifi className="w-4 h-4" />;
    if (apiStatus === 'disconnected') return <WifiOff className="w-4 h-4" />;
    return <div className="w-4 h-4 border-2 border-warning/30 border-t-warning rounded-full animate-spin" />;
  };

  return (
    <footer className="relative z-10 w-full border-t border-border bg-surface/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* API Status */}
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 ${getStatusColor()}`}>
              <StatusIcon />
              <span className="text-sm font-medium">{getStatusText()}</span>
              {apiStatus === 'connected' && (
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              )}
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-6 text-text-secondary">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span className="text-sm">
                  {totalQueries.toLocaleString()} queries processed
                </span>
              </div>
              
              {averageResponseTime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {averageResponseTime}ms avg response
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 text-text-secondary">
            {/* Performance Indicator */}
            <div className="hidden lg:flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm">
                {apiStatus === 'connected' ? 'Optimal Performance' : 'Performance Degraded'}
              </span>
            </div>

            {/* Current Time */}
            <div className="text-sm">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                className="text-text-secondary hover:text-primary transition-colors"
                title="Documentation"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-primary transition-colors"
                title="Support"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="sm:hidden mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-text-secondary text-sm">
            <span>{totalQueries.toLocaleString()} queries</span>
            {averageResponseTime > 0 && <span>{averageResponseTime}ms avg</span>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
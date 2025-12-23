import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-muted-foreground">
                    We encountered an unexpected error. Please try again.
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="space-y-2">
                  <details className="bg-muted/50 rounded-lg p-4">
                    <summary className="cursor-pointer font-semibold text-sm">
                      Error Details (Development Only)
                    </summary>
                    <div className="mt-4 space-y-2">
                      <div className="text-sm">
                        <strong className="text-destructive">Error:</strong>{' '}
                        <code className="text-xs bg-background p-1 rounded">
                          {this.state.error.toString()}
                        </code>
                      </div>
                      {this.state.errorInfo && (
                        <div className="text-sm">
                          <strong className="text-destructive">Stack:</strong>
                          <pre className="text-xs bg-background p-2 rounded mt-2 overflow-auto max-h-48">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}
              
              <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
                <p>If this problem persists, please contact our support team with the following information:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>What you were doing when the error occurred</li>
                  <li>The page you were on</li>
                  <li>Your browser and device information</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button onClick={this.handleReset} className="w-full sm:w-auto gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={this.handleGoHome} variant="outline" className="w-full sm:w-auto gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

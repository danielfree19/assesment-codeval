import { useEffect } from 'react';
export default function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    useEffect(() => {
      console.error('Caught by ErrorBoundary:', error);
    }, [error]);
  
    return (
      <div>
        <h1>Something went wrong:</h1>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Try Again</button>
      </div>
    );
  }
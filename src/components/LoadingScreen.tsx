import React from 'react'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="app">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="loading-inner"></div>
        </div>
        
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          margin: '0 0 16px 0',
          color: 'white'
        }}>
          {message}
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: 'rgba(255, 255, 255, 0.8)',
          margin: 0,
          maxWidth: '400px'
        }}>
          Please wait while we initialize ShrubAI
        </p>
      </div>
    </div>
  )
}
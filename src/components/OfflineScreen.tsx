import React from 'react'
import { CloudOff, RefreshCw } from 'lucide-react'

interface OfflineScreenProps {
  onRetryClick: () => void
}

export function OfflineScreen({ onRetryClick }: OfflineScreenProps) {
  return (
    <div className="app">
      <div className="offline-container">
        <div className="card offline-card">
          <CloudOff className="offline-icon" />
          
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            margin: '0 0 16px 0',
            color: '#2d3748'
          }}>
            You're Offline
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#4a5568',
            margin: '0 0 32px 0',
            lineHeight: '1.6'
          }}>
            ShrubAI requires an internet connection to function. Please check your network settings and try again.
          </p>
          
          <button className="button" onClick={onRetryClick} style={{ 
            width: '100%', 
            justifyContent: 'center',
            fontSize: '18px',
            padding: '16px 24px'
          }}>
            <RefreshCw size={20} />
            Try Again
          </button>
          
          <div className="tips-section">
            <h4>Tips:</h4>
            <ul>
              <li>Check your WiFi or mobile data connection</li>
              <li>Make sure airplane mode is turned off</li>
              <li>Try moving to a location with better signal</li>
              <li>Restart your router if using WiFi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
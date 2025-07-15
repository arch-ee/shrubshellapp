import { useState, useEffect } from 'react'

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [networkType, setNetworkType] = useState<string>('Unknown')

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine)
      
      // Try to detect network type
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        if (connection) {
          setNetworkType(connection.effectiveType || 'Unknown')
        }
      } else {
        setNetworkType(navigator.onLine ? 'WiFi' : 'Offline')
      }
    }

    const handleOnline = () => {
      setIsOnline(true)
      updateNetworkStatus()
    }

    const handleOffline = () => {
      setIsOnline(false)
      setNetworkType('Offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial check
    updateNetworkStatus()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, networkType }
}
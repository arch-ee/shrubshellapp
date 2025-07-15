import React, { useState, useEffect } from 'react'
import { LoadingScreen } from './components/LoadingScreen'
import { OfflineScreen } from './components/OfflineScreen'
import { MainScreen } from './components/MainScreen'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import './App.css'

enum ScreenState {
  LOADING,
  OFFLINE,
  CONTENT
}

function App() {
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.LOADING)
  const { isOnline, networkType } = useNetworkStatus()

  // Handle network status changes
  useEffect(() => {
    if (screenState === ScreenState.CONTENT || screenState === ScreenState.OFFLINE) {
      setScreenState(isOnline ? ScreenState.CONTENT : ScreenState.OFFLINE)
    }
  }, [isOnline, screenState])

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenState(isOnline ? ScreenState.CONTENT : ScreenState.OFFLINE)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isOnline])

  const handleRetry = () => {
    if (navigator.onLine) {
      setScreenState(ScreenState.CONTENT)
    }
  }

  switch (screenState) {
    case ScreenState.LOADING:
      return <LoadingScreen message="Starting up..." />
    case ScreenState.OFFLINE:
      return <OfflineScreen onRetryClick={handleRetry} />
    case ScreenState.CONTENT:
      return <MainScreen networkType={networkType} />
    default:
      return <LoadingScreen />
  }
}

export default App
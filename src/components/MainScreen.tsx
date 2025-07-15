import React from 'react'
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  GraduationCap, 
  Code, 
  BarChart3,
  Wifi,
  Signal,
  Globe
} from 'lucide-react'

interface MainScreenProps {
  networkType: string
}

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

export function MainScreen({ networkType }: MainScreenProps) {
  const features: FeatureItem[] = [
    {
      icon: <Brain className="feature-icon" />,
      title: "AI Assistant",
      description: "Get intelligent responses and assistance for your daily tasks"
    },
    {
      icon: <MessageCircle className="feature-icon" />,
      title: "Smart Conversations",
      description: "Engage in natural conversations with advanced AI technology"
    },
    {
      icon: <Lightbulb className="feature-icon" />,
      title: "Creative Ideas",
      description: "Generate creative solutions and innovative ideas instantly"
    },
    {
      icon: <GraduationCap className="feature-icon" />,
      title: "Learning Support",
      description: "Get help with learning new concepts and skills"
    },
    {
      icon: <Code className="feature-icon" />,
      title: "Code Assistant",
      description: "Programming help and code generation support"
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: "Data Analysis",
      description: "Analyze and interpret data with AI-powered insights"
    }
  ]

  const getNetworkIcon = () => {
    switch (networkType.toLowerCase()) {
      case 'wifi':
        return <Wifi size={16} />
      case 'mobile data':
      case 'cellular':
        return <Signal size={16} />
      default:
        return <Globe size={16} />
    }
  }

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Brain size={48} style={{ color: '#667eea', margin: '0 auto 24px' }} />
          
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to ShrubAI
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#4a5568',
            margin: '0 0 24px 0'
          }}>
            Your intelligent AI companion
          </p>
          
          {/* Network status indicator */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '8px',
            color: '#667eea',
            fontSize: '14px'
          }}>
            {getNetworkIcon()}
            <span>Connected via {networkType}</span>
          </div>
        </div>
        
        {/* Features section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '600', 
            margin: '0 0 24px 0',
            color: 'white',
            textAlign: 'center'
          }}>
            Features
          </h2>
          
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                {feature.icon}
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Get started button */}
        <div style={{ textAlign: 'center' }}>
          <button className="button" style={{ 
            fontSize: '18px',
            padding: '16px 32px',
            margin: '0 auto'
          }}>
            <MessageCircle size={20} />
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  )
}
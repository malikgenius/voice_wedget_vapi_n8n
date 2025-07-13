'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchVapiConfig } from '../config/vapi';
import { X, Mic, Send, Phone, PhoneOff } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const VapiWidget = () => {
  const [vapi, setVapi] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isConnected, setIsConnected] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [vapiConfig, setVapiConfig] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch Vapi configuration securely from API
    const loadVapiConfig = async () => {
      try {
        const config = await fetchVapiConfig();
        setVapiConfig(config);
        
        // Only proceed if we have the required configuration
        if (!config.assistantId || !config.publicApiKey) {
          console.warn('Vapi configuration missing. Please set environment variables.');
          return;
        }
      } catch (error) {
        console.error('Failed to load Vapi configuration:', error);
        return;
      }
    };

    loadVapiConfig();
  }, []);

  useEffect(() => {
    // Only initialize Vapi after we have the configuration
    if (!vapiConfig) return;

    // Import Vapi dynamically
    const initVapi = async () => {
      try {
        const { default: Vapi } = await import('@vapi-ai/web');
        const vapiInstance = new Vapi(vapiConfig.publicApiKey);
        
        // Set up event listeners
        vapiInstance.on('call-start', () => {
          setIsCallActive(true);
          setIsExpanded(true);
          addMessage('assistant', 'Hello! I\'m your YallaTalk AI assistant. How can I help you today?');
          console.log('✅ Call started');
        });
        
        vapiInstance.on('call-end', () => {
          setIsCallActive(false);
          setIsRecording(false);
          setTranscript('');
          addMessage('assistant', 'Call ended. Thank you for using YallaTalk!');
          console.log('✅ Call ended');
        });
        
        vapiInstance.on('speech-start', () => {
          setIsRecording(true);
          console.log('🎤 User started speaking');
        });
        
        vapiInstance.on('speech-end', () => {
          setIsRecording(false);
          console.log('🔇 User stopped speaking');
        });
        
        // Handle all message types from Vapi
        vapiInstance.on('message', (message: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          console.log('📨 Vapi Message:', message);
          addDebugInfo(`Message: ${message.type || 'unknown'} - ${JSON.stringify(message).slice(0, 100)}`);
          
          // Handle different message types
          switch (message.type) {
            case 'transcript':
              if (message.transcriptType === 'partial') {
                // Show live transcript
                setTranscript(message.transcript || '');
                console.log('📝 Partial transcript:', message.transcript);
              } else if (message.transcriptType === 'final') {
                // Add final transcript as message
                if (message.transcript) {
                  addMessage(message.role === 'assistant' ? 'assistant' : 'user', message.transcript);
                  console.log(`💬 Final ${message.role} message:`, message.transcript);
                }
                setTranscript('');
              }
              break;
              
            case 'function-call':
              console.log('🔧 Function call:', message);
              break;
              
            case 'hang':
              console.log('📞 Call hangup detected');
              break;
              
            case 'speech-update':
              if (message.status === 'started') {
                setIsRecording(true);
              } else if (message.status === 'stopped') {
                setIsRecording(false);
              }
              break;
              
            default:
              // Handle any other message types
              if (message.content || message.text) {
                const content = message.content || message.text;
                const role = message.role || 'assistant';
                addMessage(role, content);
                console.log(`💭 Generic message from ${role}:`, content);
              }
              break;
          }
        });
        
        // Note: 'transcript' event may not be available in current SDK version
        // All transcript data should come through the 'message' event above
        
        // Note: Only using supported events from Vapi SDK
        addDebugInfo('Vapi instance initialized with all event listeners');
        
        vapiInstance.on('error', (error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          console.error('❌ Vapi error:', error);
          addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        });
        
        setVapi(vapiInstance);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to initialize Vapi:', error);
      }
    };

    initVapi();

    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, [vapiConfig]); // Only re-run when vapiConfig changes

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, transcript]);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addDebugInfo = (info: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugInfo(prev => [...prev.slice(-10), `${timestamp}: ${info}`]); // Keep last 10 entries
  };

  const startCall = () => {
    if (vapi && !isCallActive) {
      setShowConsent(true);
    }
  };

  const confirmCall = () => {
    setShowConsent(false);
    if (vapi) {
      vapi.start(vapiConfig.assistantId);
    }
  };

  const endCall = () => {
    if (vapi && isCallActive) {
      vapi.stop();
    }
  };

  const toggleCall = () => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      addMessage('user', textInput);
      
      // Try to send text message to Vapi if call is active
      if (vapi && isCallActive) {
        try {
          // Attempt to send text message (may not work with all Vapi configurations)
          if (vapi.send) {
            vapi.send({ type: 'add-message', message: { role: 'user', content: textInput } });
          }
        } catch {
          console.log('Text messaging not available in current call');
        }
      }
      
      // If no call is active, show helpful message
      if (!isCallActive) {
        setTimeout(() => {
          addMessage('assistant', 'To start a conversation, please click the phone icon to begin a voice call. Voice interaction provides the best experience with YallaTalk AI!');
        }, 500);
      }
      
      setTextInput('');
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isConnected || !vapi) {
    return null;
  }

  return (
    <>
      {/* Consent Dialog */}
      {showConsent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgb(17, 24, 39)',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(55, 65, 81, 0.8)',
              maxWidth: '400px',
              color: 'white',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
              Voice Call Consent
            </h3>
            <p style={{ color: 'rgba(156, 163, 175, 1)', marginBottom: '24px', lineHeight: '1.5' }}>
              This call will be recorded and processed by YallaTalk AI assistant to provide you with the best possible experience. Do you consent to proceed?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowConsent(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(75, 85, 99, 0.6)',
                  borderRadius: '8px',
                  color: 'rgba(156, 163, 175, 1)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmCall}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246))',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Accept & Start Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {isExpanded && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '0px' : '120px',
            right: isMobile ? '0px' : '40px',
            left: isMobile ? '0px' : 'auto',
            width: isMobile ? '100%' : '400px',
            height: isMobile ? '100vh' : '600px',
            maxHeight: isMobile ? '100vh' : '80vh',
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(16px)',
            border: isMobile ? 'none' : '1px solid rgba(55, 65, 81, 0.8)',
            borderRadius: isMobile ? '0px' : '16px',
            borderTopLeftRadius: isMobile ? '16px' : '16px',
            borderTopRightRadius: isMobile ? '16px' : '16px',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: isMobile ? '20px 16px 16px 16px' : '16px',
              paddingTop: isMobile ? '20px' : '16px', // Extra space for mobile status bar
              borderBottom: '1px solid rgba(75, 85, 99, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isCallActive ? 'rgb(34, 197, 94)' : 'rgb(107, 114, 128)',
                }}
              />
              <span style={{ 
                color: 'white', 
                fontWeight: '600',
                fontSize: isMobile ? '16px' : '14px',
              }}>
                {vapiConfig?.agentName || 'YallaTalk Assistant'}
              </span>
              <button
                onClick={() => setShowDebug(!showDebug)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(75, 85, 99, 0.6)',
                  color: 'rgba(156, 163, 175, 1)',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                }}
              >
                DEBUG
              </button>
            </div>
            <button
              onClick={toggleExpanded}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(156, 163, 175, 1)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    backgroundColor: message.role === 'user'
                      ? 'linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246))'
                      : 'rgba(31, 41, 55, 0.8)',
                    color: 'white',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    border: message.role === 'assistant' ? '1px solid rgba(75, 85, 99, 0.4)' : 'none',
                    borderBottomRightRadius: message.role === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: message.role === 'assistant' ? '4px' : '16px',
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {/* Live Transcript */}
            {transcript && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(20, 184, 166, 0.3)',
                    color: 'rgba(20, 184, 166, 1)',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    border: '1px solid rgba(20, 184, 166, 0.5)',
                    fontStyle: 'italic',
                  }}
                >
                  {transcript}...
                </div>
              </div>
            )}

            {/* Debug Panel */}
            {showDebug && (
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(107, 114, 128, 0.6)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '10px',
                  color: 'rgba(156, 163, 175, 1)',
                  fontFamily: 'monospace',
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Debug Info:</div>
                {debugInfo.length === 0 ? (
                  <div>No events captured yet...</div>
                ) : (
                  debugInfo.map((info, index) => (
                    <div key={index} style={{ marginBottom: '4px', wordBreak: 'break-all' }}>
                      {info}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Invisible div to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: isMobile ? '16px 16px 32px 16px' : '16px', // Extra bottom padding for mobile
              borderTop: '1px solid rgba(75, 85, 99, 0.4)',
              display: 'flex',
              gap: isMobile ? '8px' : '12px',
              alignItems: 'center',
              flexShrink: 0,
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
            }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: isMobile ? '14px 16px' : '12px 16px',
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                border: '1px solid rgba(75, 85, 99, 0.6)',
                borderRadius: '12px',
                color: 'white',
                fontSize: isMobile ? '16px' : '14px', // Prevent zoom on iOS
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendText}
              disabled={!textInput.trim()}
              style={{
                padding: '12px',
                background: textInput.trim() 
                  ? 'linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246))'
                  : 'rgba(75, 85, 99, 0.6)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: textInput.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
            </button>
            <button
              onClick={toggleCall}
              style={{
                padding: '12px',
                background: isCallActive
                  ? 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))'
                  : 'linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246))',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isCallActive ? <PhoneOff size={16} /> : <Phone size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div
        onClick={isExpanded ? undefined : toggleExpanded}
        style={{
          position: 'fixed',
          bottom: isMobile ? '20px' : '40px',
          right: isMobile ? '20px' : '40px',
          width: isMobile ? '56px' : '60px',
          height: isMobile ? '56px' : '60px',
          borderRadius: '50%',
          background: isCallActive 
            ? 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))'
            : 'linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246))',
          cursor: 'pointer',
          zIndex: 9999,
          display: isExpanded && isMobile ? 'none' : 'flex', // Hide on mobile when chat is open
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isCallActive
            ? '0 8px 32px rgba(239, 68, 68, 0.4)'
            : '0 8px 32px rgba(20, 184, 166, 0.3)',
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = isCallActive
            ? '0 12px 40px rgba(239, 68, 68, 0.5)'
            : '0 12px 40px rgba(20, 184, 166, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isCallActive
            ? '0 8px 32px rgba(239, 68, 68, 0.4)'
            : '0 8px 32px rgba(20, 184, 166, 0.3)';
        }}
        title={isCallActive ? "YallaTalk Assistant (Active)" : "Chat with YallaTalk Assistant"}
      >
        {isRecording ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'white',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          </div>
        ) : (
          <Mic size={24} color="white" />
        )}
      </div>
    </>
  );
};
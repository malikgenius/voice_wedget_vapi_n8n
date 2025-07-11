// Static configuration that doesn't require environment variables
export const vapiUIConfig = {
  buttonConfig: {
    position: "bottom-right" as const,
    offset: "40px",
    width: "60px", 
    height: "60px",
    dragEnabled: false,
    style: {
      borderRadius: "50%",
      backgroundColor: "rgb(20, 184, 166)",
      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.4)"
    },
    idle: {
      color: "rgb(20, 184, 166)",
      type: "pill" as const,
      title: "Chat with YallaTalk Assistant",
      subtitle: "Voice & Text Available",
      icon: "https://unpkg.com/lucide-static@0.321.0/icons/message-circle.svg"
    },
    loading: {
      color: "rgb(20, 184, 166)",
      type: "pill" as const,
      title: "Connecting...",
      subtitle: "Please wait",
      icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg"
    },
    active: {
      color: "rgb(239, 68, 68)",
      type: "pill" as const,
      title: "End Call",
      subtitle: "Click to hang up",
      icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg"
    }
  },
  chatConfig: {
    showTextInput: true,
    showVoiceButton: true,
    placeholder: "Type your message or click to speak...",
    theme: {
      primaryColor: "rgb(20, 184, 166)",
      backgroundColor: "rgb(17, 24, 39)",
      textColor: "rgb(255, 255, 255)",
      borderRadius: "12px"
    }
  }
};

// Function to fetch secure Vapi configuration from API
export async function fetchVapiConfig() {
  try {
    const response = await fetch('/api/vapi-config');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Vapi configuration:', error);
    throw new Error('Unable to load Vapi configuration');
  }
}
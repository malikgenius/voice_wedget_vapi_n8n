import { Navbar } from "@/components/Navbar";
import { ShapeLandingHero } from "@/components/ui/shape-landing-hero";
import { AudioWaveform } from "@/components/AudioWaveform";
import { ServiceCard } from "@/components/ServiceCard";
import { Footer } from "@/components/Footer";
import { Mic, MessageSquare, BarChart3, Zap, Brain, Globe } from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Voice Assistants",
      description: "AI-powered voice assistants for customer service and support",
      icon: <Mic className="w-8 h-8 text-white" />,
      features: [
        "24/7 availability",
        "Natural language processing",
        "Multi-platform integration",
        "Custom voice training"
      ]
    },
    {
      title: "Real-time Analytics",
      description: "Advanced analytics and insights from voice interactions",
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      features: [
        "Conversation analytics",
        "Sentiment analysis",
        "Performance metrics",
        "Custom dashboards"
      ]
    },
    {
      title: "Smart Automation",
      description: "Automate complex workflows with voice-driven triggers",
      icon: <Zap className="w-8 h-8 text-white" />,
      features: [
        "Workflow automation",
        "Smart routing",
        "Task scheduling",
        "Integration APIs"
      ]
    },
    {
      title: "AI Chat Support",
      description: "Intelligent chat support powered by advanced AI models",
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      features: [
        "Context awareness",
        "Multi-turn conversations",
        "Knowledge base integration",
        "Escalation handling"
      ]
    },
    {
      title: "Neural Processing",
      description: "Advanced neural networks for superior voice understanding",
      icon: <Brain className="w-8 h-8 text-white" />,
      features: [
        "Deep learning models",
        "Continuous improvement",
        "Edge computing",
        "Low latency processing"
      ]
    },
    {
      title: "Global Deployment",
      description: "Worldwide infrastructure for reliable voice AI services",
      icon: <Globe className="w-8 h-8 text-white" />,
      features: [
        "Global CDN",
        "Multi-region support",
        "99.9% uptime SLA",
        "Disaster recovery"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <ShapeLandingHero />
      <AudioWaveform />
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Voice AI Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive voice AI solutions designed to transform your business operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

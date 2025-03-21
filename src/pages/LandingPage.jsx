import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../Components/common/ui/button";
import { Users, Key, MessageCircle, CreditCard,Wrench  } from 'lucide-react';
import image2vector from "../assets/image2vector.svg";
import '../styles.css'; // Adjust the path as needed

export function LandingPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    return () => {
      // Cleanup
      setMounted(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-60 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className={`backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 blur-sm rounded-full mt-2"></div>
              <img src={image2vector} alt="logo" className="h-12 w-12 mt-2 relative z-10 rounded-full"/> 
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">PropertyConnect</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {['Features', 'Pricing', 'About', 'Contact'].map((item, i) => (
              <a 
                key={item} 
                href="#" 
                className={`text-white/80 hover:text-white transition-all duration-300 ease-out hover:scale-105 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 
              className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
            >
              Revolutionize Your Property Management
            </h1>
            <p 
              className={`text-xl text-white/80 mb-10 transition-all duration-1000 ease-out delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              One seamless platform connecting landlords and tenants for a modern, stress-free experience.
            </p>
            <div 
              className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 ease-out delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
               onClick={() => {
                document.getElementById('modern-solution' ).scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              >
                Learn More
              </Button>
              <Button 
  className="bg-transparent border-2 border-white/50 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transform hover:scale-105 transition-all duration-300 text-lg"
  onClick={() => {
    document.getElementById('experience-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }}
>
  Book a Demo
</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section id="experience-section" className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className={`text-3xl font-bold text-center mb-16 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Choose Your Experience
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Tenant Card */}
            <div 
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gradient-to-br from-blue-600/40 to-indigo-800/40 border border-blue-500/30 p-8 transition-all duration-700 ease-out hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
              onClick={() => navigate('/tenant-dashboard')}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-500 group-hover:scale-125"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="bg-white/10 p-4 rounded-full mb-6 group-hover:scale-110 transition-all duration-300">
                  <Users className="h-10 w-10 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors duration-300">I'm a Tenant</h3>
                <p className="text-white/70 mb-8">
                  Access your tenant portal, submit maintenance requests, and communicate with your landlord effortlessly.
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/tenant-dashboard');
                  }}
                >
                  Enter as Tenant
                </Button>
              </div>
            </div>

            {/* Landlord Card */}
            <div 
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gradient-to-br from-purple-600/40 to-pink-800/40 border border-purple-500/30 p-8 transition-all duration-700 ease-out hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
              onClick={() => navigate('/landlord-dashboard')}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-purple-600/0 group-hover:bg-purple-600/10 transition-all duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-500 group-hover:scale-125"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="bg-white/10 p-4 rounded-full mb-6 group-hover:scale-110 transition-all duration-300">
                  <Key className="h-10 w-10 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors duration-300">I'm a Landlord</h3>
                <p className="text-white/70 mb-8">
                  Manage your properties, track maintenance requests, and stay connected with your tenants seamlessly.
                </p>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/landlord-dashboard');
                  }}
                >
                  Enter as Landlord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='modern-solution' className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className={`text-3xl font-bold text-center mb-4 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Modern Solutions for Modern Living
          </h2>
          <p 
            className={`text-xl text-center text-white/70 max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            Discover why thousands of property owners and tenants choose PropertyConnect
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: 'Smart Communication',
                description: 'AI-powered messaging system that intelligently prioritizes and categorizes communications.',
                color: 'from-blue-500 to-cyan-400',
                delay: 400
              },
              {
                icon: <Wrench  className="h-8 w-8" />,
                title: 'Maintenance Tracking',
                description: 'Real-time updates and scheduling for maintenance requests with photo documentation.',
                color: 'from-purple-500 to-indigo-400',
                delay: 600
              },
              {
                icon: <CreditCard className="h-8 w-8" />,
                title: 'Secure Payments',
                description: 'Integrated payment processing with automatic receipts and payment history tracking.',
                color: 'from-pink-500 to-rose-400',
                delay: 800
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 p-6 hover:bg-white/10 transition-all duration-500 ease-out ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full bg-gradient-to-r ${feature.color} opacity-30 blur-xl group-hover:opacity-50 transition-all duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">{feature.title}</h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Ready to Transform Your Property Management?
          </h2>
          <p 
            className={`text-xl text-white/80 max-w-3xl mx-auto mb-10 transition-all duration-700 ease-out delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Join thousands of satisfied users who have streamlined their property management experience with PropertyConnect.
          </p>
          <div 
            className={`transition-all duration-700 ease-out delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <Button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              onClick={() => {
                document.getElementById('experience-section').scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-transparent to-black/50 backdrop-blur-sm pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 pb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={image2vector} alt="logo" className="h-8 w-8"/> 
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">PropertyConnect</span>
              </div>
              <p className="text-white/60 text-sm">
                Modernizing the property management experience for landlords and tenants alike.
              </p>
            </div>
            
            {['Company', 'Resources', 'Legal'].map((category, i) => (
              <div key={category}>
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {['About Us', 'Features', 'Contact', 'Support'].map((item, j) => (
                    <li key={item}>
                      <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 PropertyConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
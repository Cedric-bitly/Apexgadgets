import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Animate stats counter
    const animateStats = () => {
      const statNumbers = document.querySelectorAll('.stat-number');
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target;
          }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(stat);
      });
    };

    // Delay stats animation until page loads
    setTimeout(animateStats, 1500);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="home">
      {/* Animated Background Elements */}
      <div className="bg-grid"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Mouse Follow Light */}
      <div 
        className="mouse-light"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      <div className="hero-section">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          {/* Glitch Effect Title */}
          <div className="title-wrapper">
            <h1 className="hero-title" data-text="Welcome to Apex Gadgets">
              Welcome to Apex Gadgets
            </h1>
            <div className="title-glow"></div>
          </div>
          
          {/* Typing Effect Subtitle */}
          <p className="hero-subtitle">
            <span className="typing-text">Your premium destination for cutting-edge technology and innovative gadgets</span>
          </p>
          
          {/* Enhanced Buttons */}
          <div className="hero-buttons">
            <Link to="/getproducts" className="hero-btn primary-btn">
              <span className="btn-text">Browse Products</span>
              <span className="btn-glow"></span>
              <div className="btn-particles"></div>
            </Link>
            <Link to="/signup" className="hero-btn secondary-btn">
              <span className="btn-text">Sign Up</span>
              <span className="btn-glow"></span>
              <div className="btn-particles"></div>
            </Link>
          </div>

          {/* Stats Counter */}
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number" data-target="1000">0</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="50">0</div>
              <div className="stat-label">Brands</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="99">0</div>
              <div className="stat-label">Satisfaction %</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Apex</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card" data-feature="quality">
                <div className="feature-icon">
                  <div className="icon-glow"></div>
                  <span className="icon">⚡</span>
                </div>
                <h3>Premium Quality</h3>
                <p>Only the best gadgets and technology from trusted brands with cutting-edge innovation</p>
                <div className="feature-hover-line"></div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card" data-feature="delivery">
                <div className="feature-icon">
                  <div className="icon-glow"></div>
                  <span className="icon">🚀</span>
                </div>
                <h3>Fast Delivery</h3>
                <p>Quick and reliable shipping to get your gadgets to you fast with real-time tracking</p>
                <div className="feature-hover-line"></div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card" data-feature="payment">
                <div className="feature-icon">
                  <div className="icon-glow"></div>
                  <span className="icon">🔒</span>
                </div>
                <h3>Secure Payment</h3>
                <p>Safe and secure payment processing with military-grade encryption for your peace of mind</p>
                <div className="feature-hover-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Grid Overlay */}
      <div className="tech-overlay"></div>
    </div>
  );
};

export default Home;

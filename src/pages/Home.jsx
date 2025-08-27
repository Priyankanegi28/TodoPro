import { faAngleDown, faArrowRight, faBell, faBolt, faChartLine, faCheckCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  const [counters, setCounters] = useState({
    users: 0,
    satisfaction: 0
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    // Animate counters
    const animateCounters = () => {
      const targetUsers = 250000;
      const targetSatisfaction = 98;
      const speed = 200;
      
      const incrementUsers = targetUsers / speed;
      const incrementSatisfaction = targetSatisfaction / speed;
      
      const timer = setInterval(() => {
        setCounters(prev => {
          const newUsers = Math.min(prev.users + incrementUsers, targetUsers);
          const newSatisfaction = Math.min(prev.satisfaction + incrementSatisfaction, targetSatisfaction);
          
          if (newUsers === targetUsers && newSatisfaction === targetSatisfaction) {
            clearInterval(timer);
          }
          
          return {
            users: Math.ceil(newUsers),
            satisfaction: Math.ceil(newSatisfaction)
          };
        });
      }, 1);
      
      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
      }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-content animate__animated animate__fadeInLeft">
          <h1>Master Your <span className="highlight">Productivity</span></h1>
          <p className="subtitle">Organize, prioritize, and conquer your tasks with our intuitive todo app. Get more done with less stress.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn primary pulse">Start for Free <FontAwesomeIcon icon={faArrowRight} /></Link>
            <a href="#features" className="btn secondary">Learn More <FontAwesomeIcon icon={faAngleDown} /></a>
          </div>
          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">{counters.users.toLocaleString()}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counters.satisfaction}</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
        <div className="hero-image animate__animated animate__fadeInRight">
          <img src="https://illustrations.popsy.co/amber/digital-nomad.svg" alt="Productivity illustration" />
          <div className="floating-badge">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>Task Completed!</span>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="section-header">
          <h2>Why TodoPro Stands Out</h2>
          <p className="section-subtitle">Powerful features designed to boost your productivity</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card" data-aos="fade-up">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Quick add and organize tasks with keyboard shortcuts and intuitive controls that save you time.</p>
            <a href="#" className="feature-link">See how it works <FontAwesomeIcon icon={faArrowRight} /></a>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faLayerGroup} />
            </div>
            <h3>Smart Categories</h3>
            <p>Organize tasks by projects, tags, or custom categories that adapt to your workflow.</p>
            <a href="#" className="feature-link">Explore categories <FontAwesomeIcon icon={faArrowRight} /></a>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <h3>Smart Reminders</h3>
            <p>Never miss deadlines with customizable notifications and intelligent recurring tasks.</p>
            <a href="#" className="feature-link">Set reminders <FontAwesomeIcon icon={faArrowRight} /></a>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <h3>Progress Tracking</h3>
            <p>Visualize your productivity with beautiful charts and insightful completion statistics.</p>
            <a href="#" className="feature-link">View analytics <FontAwesomeIcon icon={faArrowRight} /></a>
          </div>
        </div>
      </section>

      {/* Other sections (Demo, Testimonials, Pricing, CTA) would go here */}
    </main>
  );
};

export default Home;
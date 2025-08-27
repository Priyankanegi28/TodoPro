import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";


const Footer = () => {
  const [activeLink, setActiveLink] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Subscribed with email:', email);
    alert('Thank you for subscribing!');
    e.target.reset();
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    console.log(`Clicked on: ${linkName}`);
    // In a real application, you would navigate to the appropriate page here
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerBrand}>
          <FontAwesomeIcon icon={faTasks} style={styles.logoIcon} />
          <span style={styles.logoText}>TodoPro</span>
          <p style={styles.tagline}>Your productivity companion</p>
          <div style={styles.newsletter}>
            <h4 style={styles.newsletterTitle}>Subscribe to our newsletter</h4>
            <form style={styles.newsletterForm} onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email" 
                placeholder="Your email address" 
                required 
                style={styles.emailInput}
              />
              <button type="submit" style={styles.submitButton}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
        <div style={styles.footerLinks}>
          <div style={styles.linkGroup}>
            <h4 style={styles.groupTitle}>Product</h4>
            <button 
              style={activeLink === 'Features' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Features')}
            >
              Features
            </button>
            <button 
              style={activeLink === 'Pricing' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Pricing')}
            >
              Pricing
            </button>
            <button 
              style={activeLink === 'Updates' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Updates')}
            >
              Updates
            </button>
            <button 
              style={activeLink === 'Roadmap' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Roadmap')}
            >
              Roadmap
            </button>
            <button 
              style={activeLink === 'Integrations' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Integrations')}
            >
              Integrations
            </button>
          </div>
          <div style={styles.linkGroup}>
            <h4 style={styles.groupTitle}>Company</h4>
            <button 
              style={activeLink === 'About' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('About')}
            >
              About
            </button>
            <button 
              style={activeLink === 'Careers' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Careers')}
            >
              Careers
            </button>
            <button 
              style={activeLink === 'Contact' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Contact')}
            >
              Contact
            </button>
            <button 
              style={activeLink === 'Blog' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Blog')}
            >
              Blog
            </button>
            <button 
              style={activeLink === 'Press' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Press')}
            >
              Press
            </button>
          </div>
          <div style={styles.linkGroup}>
            <h4 style={styles.groupTitle}>Resources</h4>
            <button 
              style={activeLink === 'Help Center' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Help Center')}
            >
              Help Center
            </button>
            <button 
              style={activeLink === 'Tutorials' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Tutorials')}
            >
              Tutorials
            </button>
            <button 
              style={activeLink === 'Community' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Community')}
            >
              Community
            </button>
            <button 
              style={activeLink === 'Webinars' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Webinars')}
            >
              Webinars
            </button>
            <button 
              style={activeLink === 'Templates' ? {...styles.linkButton, ...styles.activeLink} : styles.linkButton}
              onClick={() => handleLinkClick('Templates')}
            >
              Templates
            </button>
          </div>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p style={styles.copyright}>&copy; {new Date().getFullYear()} TodoPro. All rights reserved.</p>
        <div style={styles.footerLegal}>
          <button 
            style={activeLink === 'Privacy Policy' ? {...styles.legalButton, ...styles.activeLegal} : styles.legalButton}
            onClick={() => handleLinkClick('Privacy Policy')}
          >
            Privacy Policy
          </button>
          <button 
            style={activeLink === 'Terms of Service' ? {...styles.legalButton, ...styles.activeLegal} : styles.legalButton}
            onClick={() => handleLinkClick('Terms of Service')}
          >
            Terms of Service
          </button>
          <button 
            style={activeLink === 'Cookie Policy' ? {...styles.legalButton, ...styles.activeLegal} : styles.legalButton}
            onClick={() => handleLinkClick('Cookie Policy')}
          >
            Cookie Policy
          </button>
        </div>
        <div style={styles.socialLinks}>
          <button 
            style={activeLink === 'Twitter' ? {...styles.socialButton, ...styles.activeSocial} : styles.socialButton}
            onClick={() => handleLinkClick('Twitter')}
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </button>
          <button 
            style={activeLink === 'Facebook' ? {...styles.socialButton, ...styles.activeSocial} : styles.socialButton}
            onClick={() => handleLinkClick('Facebook')}
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </button>
          <button 
            style={activeLink === 'Instagram' ? {...styles.socialButton, ...styles.activeSocial} : styles.socialButton}
            onClick={() => handleLinkClick('Instagram')}
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </button>
          <button 
            style={activeLink === 'LinkedIn' ? {...styles.socialButton, ...styles.activeSocial} : styles.socialButton}
            onClick={() => handleLinkClick('LinkedIn')}
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </button>
          <button 
            style={activeLink === 'YouTube' ? {...styles.socialButton, ...styles.activeSocial} : styles.socialButton}
            onClick={() => handleLinkClick('YouTube')}
            aria-label="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '2rem',
  },
  footerBrand: {
    flex: '1',
    minWidth: '250px',
  },
  logoIcon: {
    fontSize: '2rem',
    color: '#3498db',
    marginRight: '0.5rem',
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#3498db',
  },
  tagline: {
    margin: '0.5rem 0 1.5rem',
    color: '#bdc3c7',
  },
  newsletter: {
    marginTop: '1.5rem',
  },
  newsletterTitle: {
    margin: '0 0 1rem',
    fontSize: '1.2rem',
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.5rem',
  },
  emailInput: {
    flex: '1',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLinks: {
    flex: '2',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  linkGroup: {
    minWidth: '150px',
  },
  groupTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#3498db',
  },
  linkButton: {
    display: 'block',
    background: 'none',
    border: 'none',
    color: '#ecf0f1',
    padding: '0.5rem 0',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    transition: 'color 0.3s ease',
  },
  activeLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '2rem auto 0',
    paddingTop: '1.5rem',
    borderTop: '1px solid #34495e',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    margin: '0',
    color: '#bdc3c7',
  },
  footerLegal: {
    display: 'flex',
    gap: '1rem',
  },
  legalButton: {
    background: 'none',
    border: 'none',
    color: '#ecf0f1',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
  },
  activeLegal: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialButton: {
    background: 'none',
    border: 'none',
    color: '#ecf0f1',
    cursor: 'pointer',
    fontSize: '1.2rem',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  activeSocial: {
    backgroundColor: '#3498db',
    color: 'white',
  },
};

export default Footer;
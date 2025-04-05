import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../styles/EntryPage.css';

// Import images
import physicsImg from '../assets/health.jpg';
import biologyImg from '../assets/biology.png';
import chemistryImg from '../assets/circuit-simulator.jpg';
import engineeringImg from '../assets/molecular-lab.jpg';
import healthImg from '../assets/mechanics-lab.jpg';
import homeScienceImg from '../assets/ohms-law.jpg';

const EntryPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const navItems = [
    'Home', 'Project', 'Workshop', 'Nodal Centres',
    'News & Events', 'Publications', 'Feedback',
    'Contact', 'Login', 'Search'
  ];

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleNavItemClick = (item) => {
    if (item === 'Search') {
      setShowSearch(!showSearch);
      if (!showSearch) {
        setQuery('');
        setSearchResults([]);
      }
    } else if (item === 'Project') {
      navigate('/projects');
    }
    // Add other navigation handlers as needed
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== '') {
      try {
        // Replace with actual API call in production
        const mockResults = cardData.filter(card => 
          card.title.toLowerCase().includes(value.toLowerCase()) || 
          card.description.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(mockResults);
      } catch (err) {
        console.error('Search failed:', err);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const cardData = [
    {
      title: 'PHYSICS',
      image: physicsImg,
      description: 'Explore simulations in mechanics, optics, and electricity with interactive AR tools.',
      path: '/physics'
    },
    {
      title: 'BIOLOGY',
      image: biologyImg,
      description: 'Visualize molecular structures, reactions, and chemical processes in a virtual lab environment.',
      path: '/biology'
    },
    {
      title: 'CHEMISTRY',
      image: chemistryImg,
      description: 'Dive into cell biology, genetics, and anatomy through interactive 3D simulations.',
      path: '/chemistry'
    },
    {
      title: 'ENGINEERING',
      image: engineeringImg,
      description: 'Access engineering design tools and circuit simulations tailored for practical learning.',
      path: '/engineering'
    },
    {
      title: 'HEALTH EDUCATION',
      image: healthImg,
      description: 'Engage in virtual health training, anatomy modules, and medical simulations.',
      path: '/health-education'
    },
    {
      title: 'HOME SCIENCE',
      image: homeScienceImg,
      description: 'Learn about nutrition, textiles, and home management through immersive lab setups.',
      path: '/home-science'
    }
  ];

  return (
    <div className={`entry-page ${darkMode ? 'dark' : ''}`}>
      {/* Navigation Bar */}
      <nav className="navigation-bar">
        <div className="nav-container">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${item === 'Search' ? 'search-item' : ''}`}
              onClick={() => handleNavItemClick(item)}
            >
              {item}
            </div>
          ))}
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun className="theme-icon" /> : <FiMoon className="theme-icon" />}
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {showSearch && (
        <SearchBar 
          query={query} 
          onChange={handleSearch} 
          results={searchResults} 
          darkMode={darkMode}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        <h2 className="section-label">Virtual Labs at ARLab-PAS</h2>
        <div className="card-grid">
          {cardData.map((card, idx) => (
            <div key={idx} className={`card ${darkMode ? 'dark-card' : ''}`}>
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <Link to={card.path} className="lab-link">
                  <h3 className="card-title">{card.title}</h3>
                </Link>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EntryPage;
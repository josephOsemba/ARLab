import { Link } from 'react-router-dom';
import { FiClock, FiTarget, FiActivity, FiSettings } from 'react-icons/fi';
import Navbar from '../components/Navbar'; // Import your main Navbar component
import '../styles/Physics.css';

const PhysicsPracticals = () => {
  const experiments = [
    {
      icon: <FiClock className="experiment-icon" size={24} />,
      title: "Measuring the acceleration due to gravity (g) using a simple pendulum",
      description: "This experiment involves determining the gravitational acceleration by measuring the period of oscillation of a simple pendulum at varying lengths. Students will collect data, analyze the relationship between pendulum length and period, and calculate the value of g using the pendulum equation T = 2π√(L/g).",
      path: "/practicals/pendulum-gravity"
    },
    {
      icon: <FiTarget className="experiment-icon" size={24} />,
      title: "Exploring projectile motion",
      description: "Investigate the parabolic trajectory of projectiles by analyzing horizontal and vertical motion components independently. Students will measure range, maximum height, and flight time at different launch angles to verify the theoretical equations of projectile motion and understand the effect of initial velocity and angle on the trajectory.",
      path: "/practicals/projectile-motion"
    },
    {
      icon: <FiActivity className="experiment-icon" size={24} />,
      title: "Investigating the relationship between force, mass, and acceleration (Newton's Second Law)",
      description: "Demonstrate Newton's Second Law (F=ma) using a dynamics track with a trolley and hanging masses. Students will measure acceleration while varying either the force (while keeping mass constant) or mass (while keeping force constant) to establish the proportional relationships and determine how net force affects an object's motion.",
      path: "/practicals/newtons-second-law"
    },
    {
      icon: <FiSettings className="experiment-icon" size={24} />,
      title: "Determining the efficiency of a machine (e.g., inclined plane, pulley system)",
      description: "Analyze simple machines by comparing work input to work output to calculate efficiency. For inclined planes, students will measure the force required to move objects up different slopes. For pulley systems, they'll compare the theoretical mechanical advantage to the actual advantage obtained through force measurements.",
      path: "/practicals/machine-efficiency"
    }
  ];

  return (
    <div className="physics-practicals-page">
      {/* Main Navbar */}
      <Navbar />
      
      {/* Content Container with proper spacing */}
      <div className="content-container">
        {/* Experiments Header */}
        <header className="experiments-header">
          <h1>Fundamental Physics Experiments</h1>
          <p className="subtitle">
            Hands-on investigations aligned with core physics principles. Conduct virtual or classroom experiments with detailed methodologies and analysis.
          </p>
        </header>

        {/* Experiments List */}
        <div className="experiments-list">
          {experiments.map((exp, index) => (
            <div key={index} className="experiment-card">
              <div className="experiment-header">
                <span className="icon-title-wrapper">
                  {exp.icon}
                  <h2 className="experiment-title">{exp.title}</h2>
                </span>
              </div>
              <p className="experiment-description">{exp.description}</p>
              <Link to={exp.path} className="experiment-link">
                View Experiment Methodology →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhysicsPracticals;
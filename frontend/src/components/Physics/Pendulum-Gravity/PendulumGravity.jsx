import React from 'react';
import { FaFlask, FaBook, FaListAlt, FaLaptopCode, FaTasks, FaBookOpen, FaCommentAlt } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import '../../../styles/PendulumGravity.css'; // Import your CSS styles for the pendulum gravity experiment

const PendulumGravity = () => {
    return (
        <div className="experiment-page">
            <h1>Pendulum Gravity</h1>

            {/* Navigation Icons */}
            <div className="nav-icons">
                <Link to="theory" className="nav-icon">
                    <FaBook className="icon" />
                    <span>Theory</span>
                </Link>
                <Link to="procedure" className="nav-icon">
                    <FaFlask className="icon" />
                    <span>Procedure</span>
                </Link>
                <Link to="evaluation" className="nav-icon">
                    <FaListAlt className="icon" />
                    <span>Self Evaluation</span>
                </Link>
                <Link to="simulator" className="nav-icon">
                    <FaLaptopCode className="icon" />
                    <span>Simulator</span>
                </Link>
                <Link to="assignment" className="nav-icon">
                    <FaTasks className="icon" />
                    <span>Assignment</span>
                </Link>
                <Link to="reference" className="nav-icon">
                    <FaBookOpen className="icon" />
                    <span>Reference</span>
                </Link>
                <Link to="feedback" className="nav-icon">
                    <FaCommentAlt className="icon" />
                    <span>Feedback</span>
                </Link>
            </div>

            {/* Nested component renderer */}
            <div className="experiment-content">
                <Outlet />
            </div>
        </div>
    );
};

export default PendulumGravity;

import React from 'react';
import '../styles/Projects.css';

import labStudents from '../assets/logo.jpg';       // Add real image paths
import digitalClassroom from '../assets/health.jpg';
import kenyaSchoolLab from '../assets/brain-simulation.jpg';

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-heading">Virtual Labs at ARLab-PAS Project</h1>
      <p className="projects-subtext">
        An initiative by <strong>Club Innovate – Kisii University</strong> to tackle practical education challenges in Kenyan universities, secondary, and junior secondary schools.
      </p>

      <div className="project-section">
        <img src={labStudents} alt="Virtual lab students" className="project-img" />
        <div className="project-text">
          <h2>Overview of Virtual Labs</h2>
          <p>
            Virtual laboratories are interactive digital platforms that replicate physical labs, enabling students to perform experiments remotely.
            They bridge the gap between theory and hands-on experience, particularly for institutions lacking real lab infrastructure.
          </p>
        </div>
      </div>

      <div className="project-section reverse">
        <img src={kenyaSchoolLab} alt="Kenya school lab" className="project-img" />
        <div className="project-text">
          <h2>Addressing Educational Challenges in Kenya</h2>
          <p>
            With less than 40% of schools having internet-connected labs, this project helps solve STEM delivery issues by providing immersive digital learning environments to schools across Kenya.
          </p>
        </div>
      </div>

      <div className="project-section">
        <img src={digitalClassroom} alt="Digital teaching" className="project-img" />
        <div className="project-text">
          <h2>Training and Implementation</h2>
          <p>
            Through CEMASTEA and other partners, teachers are trained to integrate virtual labs into curricula, ensuring effective delivery of practical subjects via digital tools.
          </p>
        </div>
      </div>

      <div className="project-section reverse">
        <div className="project-text">
          <h2>Impact on Science Education</h2>
          <p>
            Virtual Labs and ARLab-PAS empower learners and educators alike, offering scalable, inquiry-driven learning that transforms classrooms and fosters 21st-century scientific thinking.
          </p>
        </div>
      </div>

      <p className="attribution">
        Data sources: KENET, CEMASTEA, CFSK, and National Education Reports.
      </p>
    </div>
  );
};

export default Projects;

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import HomePage from "./pages/EntryPage";
import Home from "./pages/Home";
import LabScene from "./pages/LabScene";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./styles/App.css";
import Projects from './pages/Projects';
import Physics from './pages/Physics';
import Biology from './pages/Biology';
import Chemistry from './pages/Chemistry';
import Engineering from './pages/Engineering';
import HealthEducation from './pages/HealthEducation';
import HomeScience from './pages/HomeScience';
import PendulumGravity from "./components/Physics/Pendulum-Gravity/PendulumGravity";
import Theory from "./components/Physics/Pendulum-Gravity/Theory";
import Procedure from "./components/Physics/Pendulum-Gravity/Procedure";
import Evaluation from "./components/Physics/Pendulum-Gravity/Evaluation";
import Simulator from "./components/Physics/Pendulum-Gravity/Simulator";
import Assignment from "./components/Physics/Pendulum-Gravity/Assignment";
import Reference from "./components/Physics/Pendulum-Gravity/Reference";
import Feedback from "./components/Physics/Pendulum-Gravity/Feedback";


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
        <Route path="/practicals/pendulum-gravity" element={<PendulumGravity />}>
          <Route path="theory" element={<Theory />} />
          <Route path="procedure" element={<Procedure />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="assignment" element={<Assignment />} />
          <Route path="reference" element={<Reference />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
        <Route path="/physics" element={<Physics />} />
        <Route path="/biology" element={<Biology />} />
        <Route path="/chemistry" element={<Chemistry />} />
        <Route path="/engineering" element={<Engineering />} />
        <Route path="/health-education" element={<HealthEducation />} />
        <Route path="/home-science" element={<HomeScience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/AskAI" element={<Home />} />
        <Route path="/lab" element={<LabScene />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate loading delay
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <div className="app-container">
          <Navbar /> {/* Render Navbar */}
          <div className="content">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;
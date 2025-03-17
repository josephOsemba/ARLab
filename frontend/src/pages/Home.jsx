import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SideBar from "../components/SideBar";
import "../styles/Home.css";
import OpenAI from "openai";

function Home() {
  const mountRef = useRef(null);
  const chatRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const rendererRef = useRef(null);
  const animationFrameId = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Track if AI is typing

  // Initialize ARISE client
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com/v1", // Use ARISE's API endpoint
    apiKey: "sk-71ee17ccea4e4f79a6fc7ed3f4ac4bea", // Replace with your actual API key
    dangerouslyAllowBrowser: true, // Allow usage in the browser
  });

  // Summarize the user's query using ARISE API
  const summarizeQuery = async (query) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant. Summarize the following text into exactly 2-3 words." },
          { role: "user", content: query },
        ],
        model: "deepseek-chat", // Use ARISE model
        max_tokens: 5, // Limit the response to a few tokens
      });

      // Extract the assistant's response
      const summary = completion.choices[0].message.content;
      return summary;
    } catch (err) {
      console.error("Error summarizing query:", err);
      if (err.status === 1000) {
        throw new Error("Insufficient balance. Please add funds to your DeepSeek API account.");
      } else {
        throw err; // Rethrow the error for better handling in the calling function
      }
    }
  };

  // Answer user questions using ARISE API
  const answerQuery = async (query) => {
    try {
      // Analyze if the query contains physics-related components
      const analysis = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Analyze the following question and determine if it contains any physics-related components. If it does, extract the physics-related part. If it doesn't, respond with "not physics".`,
          },
          { role: "user", content: query },
        ],
        model: "deepseek-chat",
        max_tokens: 50,
      });

      const analysisResult = analysis.choices[0].message.content.trim();

      if (analysisResult === "not physics") {
        return "I'm primarily trained to answer questions related to physics. Could you ask me something about physics?";
      }

      // If the query contains physics-related components, answer that part
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a physics expert assistant. Focus on the physics-related aspects of the following question and provide a detailed answer. If the question is not entirely about physics, address only the physics part.`,
          },
          { role: "user", content: analysisResult },
        ],
        model: "deepseek-chat",
        max_tokens: 1000,
      });

      return completion.choices[0].message.content;
    } catch (err) {
      console.error("Error answering query:", err);
      throw err;
    }
  };


  // Simulate typing effect
  const simulateTyping = (text, callback) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1)); // Update the message with the next character
        index++;
      } else {
        clearInterval(typingInterval); // Stop the typing effect
        setIsTyping(false); // Mark typing as complete
      }
    }, 30); // Adjust typing speed (milliseconds per character)
  };

  // Handle sending messages
  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Summarize the user's query
      const summary = await summarizeQuery(input);

      // Add the summarized query to the search history
      const newHistoryItem = {
        query: input, // Store the full query
        summary: summary, // Store the summarized title
        timestamp: new Date().toISOString(),
      };
      setSearchHistory((prev) => [newHistoryItem, ...prev]);

      // Answer the user's query
      const answer = await answerQuery(input);

      // Add AI response to the chat with typing effect
      setIsTyping(true); // Mark typing as in progress
      simulateTyping(answer, (partialText) => {
        // Update the AI's message as it "types"
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.sender === "ai") {
            // Update the existing AI message
            return [...prev.slice(0, -1), { ...lastMessage, text: partialText }];
          } else {
            // Add a new AI message
            return [...prev, { text: partialText, sender: "ai" }];
          }
        });
      });
    } catch (err) {
      // Handle API errors
      const errorMessage = { text: err.message, sender: "ai" };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Handle Ask AI button click
  const handleAskAI = () => {
    setIsChatOpen(true);
    setIsMainContentVisible(false); // Hide main content when chat is opened
  };

  // Handle closing the chat (optional)
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setIsMainContentVisible(true); // Show main content when chat is closed
  };

  // // Handle Ask AI button click
  // const handleAskAI = () => {
  //   setIsChatOpen(true);
  // };

  // Handle click on history item
  const handleHistoryItemClick = (item) => {
    setInput(item.query); // Use the full query when clicking a history item
    setIsChatOpen(true);
  };

  // Handle sidebar collapse
  const handleSidebarCollapse = (isCollapsed) => {
    setIsSidebarCollapsed(isCollapsed);
  };

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Auto-scroll chat to the latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Three.js initialization and cleanup
  useEffect(() => {
    let scene, camera, particleSystem, particlesMaterial;
    let hue = 0; // Starting hue for color transition

    const initializeScene = () => {
      try {
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0d0d0d); // Dark background
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current = renderer;

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create particles
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 100;
          positions[i + 1] = (Math.random() - 0.5) * 100;
          positions[i + 2] = (Math.random() - 0.5) * 100;
          velocities[i] = (Math.random() - 0.5) * 0.1;
          velocities[i + 1] = (Math.random() - 0.5) * 0.1;
          velocities[i + 2] = (Math.random() - 0.5) * 0.1;
        }

        particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        // Particle material
        particlesMaterial = new THREE.PointsMaterial({
          size: 0.5,
          transparent: true,
          opacity: 0.8,
        });

        particleSystem = new THREE.Points(particles, particlesMaterial);
        scene.add(particleSystem);

        // Animation loop
        const animate = () => {
          animationFrameId.current = requestAnimationFrame(animate);

          for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            if (positions[i] > 50 || positions[i] < -50) velocities[i] *= -1;
            if (positions[i + 1] > 50 || positions[i + 1] < -50) velocities[i + 1] *= -1;
            if (positions[i + 2] > 50 || positions[i + 2] < -50) velocities[i + 2] *= -1;
          }
          particles.attributes.position.needsUpdate = true;
          particleSystem.rotation.y += 0.001;

          // Color-changing logic
          hue += 0.5;
          if (hue > 360) hue = 0;
          const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
          particlesMaterial.color.set(color);

          renderer.render(scene, camera);
        };

        // Handle window resize
        const handleResize = () => {
          const footer = document.querySelector("footer");
          const footerHeight = footer ? footer.offsetHeight : 100;
          const newHeight = window.innerHeight - footerHeight;
          camera.aspect = window.innerWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, newHeight);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        animate();
        setIsLoading(false);

        // Cleanup function
        return () => {
          window.removeEventListener("resize", handleResize);
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          particles.dispose();
          particlesMaterial.dispose();
          scene.clear();
        };
      } catch (err) {
        setError(err);
        setIsLoading(false);
        console.error("Three.js initialization error:", err);
      }
    };

    initializeScene();
  }, []);

  if (error) {
    return (
      <div className="text-white text-center p-4">
        <h1>Error initializing visualization</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <SideBar
        onAskAI={handleAskAI}
        onHistoryItemClick={handleHistoryItemClick}
        searchHistory={searchHistory}
        onCollapse={handleSidebarCollapse}
      />

      <div className="container position-relative z-1 flex-grow-1 d-flex flex-column align-items-end py-5">
        {/* Cards Section */}
        <div className="row justify-content-end text-justify">
          {["ARLab", "Research", "Innovation"].map((title, index) => (
            <div key={index} className="col-md-4">
              <div className="card bg-dark text-white shadow-lg">
                <div className="card-body">
                  <h3 className="fw-bold">{title}</h3>
                  <p className="text-muted">
                    {title === "ARLab"
                      ? "This is an AI-driven Augmented Reality Lab that allows students to perform virtual scientific experiments."
                      : title === "Research"
                      ? "We focus on cutting-edge scientific research in physics, AI, and simulations."
                      : "Bridging the gap between theory and practice through AR and AI-powered tools."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        {isChatOpen && (
          <div className="ai-chat-section">
            <div ref={chatRef} className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="chat-message ai">
                  {/*<span className="typing-indicator">Typing...</span>*/}
                </div>
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>

      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="canvas-container position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: 0,
          left: isSidebarCollapsed ? "0" : "250px", // Adjust based on sidebar width
          transition: "left 0.3s ease", // Smooth transition
        }}
      >
        {isLoading && (
          <div className="position-absolute top-50 start-50 translate-middle text-white z-1 loading-text">
            Loading...
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
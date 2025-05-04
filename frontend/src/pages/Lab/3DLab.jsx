import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const PendulumExperiment = () => {
  const [length, setLength] = useState(20); // Initial length in cm
  const [amplitude, setAmplitude] = useState(8); // Initial angle in degrees
  const [isPlaying, setIsPlaying] = useState(false);
  const [period, setPeriod] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [experimentData, setExperimentData] = useState([]);
  const [currentLengthIndex, setCurrentLengthIndex] = useState(0);
  const [isAutoRecording, setIsAutoRecording] = useState(false);

  const lengthOptions = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]; // Standard lengths to test

  // Calculate period based on length (T = 2π√(l/g))
  useEffect(() => {
    const g = 9.81; // standard gravity
    const l = length / 100;
    const calculatedPeriod = 2 * Math.PI * Math.sqrt(l / g);
    setPeriod(calculatedPeriod.toFixed(3));
  }, [length]);

  // Auto-record data when pendulum is playing
  useEffect(() => {
    if (isPlaying && isAutoRecording) {
      const timer = setTimeout(() => {
        recordDataPoint();

        // Move to next length if we have more to test
        if (currentLengthIndex < lengthOptions.length - 1) {
          setCurrentLengthIndex(currentLengthIndex + 1);
          setLength(lengthOptions[currentLengthIndex + 1]);
        } else {
          setIsAutoRecording(false);
        }
      }, 3000); // Record after 3 seconds of animation

      return () => clearTimeout(timer);
    }
  }, [isPlaying, isAutoRecording, currentLengthIndex]);

  // Record data point
  const recordDataPoint = () => {
    const newData = {
      length,
      periodSquared: (period * period).toFixed(3),
      amplitude,
      timestamp: new Date().toISOString(),
    };
    setExperimentData([...experimentData, newData]);
  };

  // Start the experiment with auto-recording
  const startExperiment = () => {
    setCurrentLengthIndex(0);
    setLength(lengthOptions[0]);
    setExperimentData([]);
    setIsAutoRecording(true);
    setIsPlaying(true);
  };

  // Calculate gravity from slope
  const calculateGravity = () => {
    if (experimentData.length < 2) return null;

    const points = experimentData.map((d) => ({
      x: parseFloat(d.periodSquared),
      y: parseFloat(d.length),
    }));

    // Simple linear regression
    const n = points.length;
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const calculatedG = (4 * Math.PI * Math.PI) / slope;

    return calculatedG.toFixed(2);
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: "'Inter', sans-serif",
        color: '#2d3748',
        backgroundColor: '#f8fafc',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#1a365d',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '24px',
          }}
        >
          Pendulum Gravity Experiment
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
            }}
          >
            <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 50] }}>
              {/* Pendulum Animation */}
              <Pendulum
                length={length}
                amplitude={amplitude}
                isPlaying={isPlaying}
              />

              {/* Scale markers (10-140) */}
              {[10, 20, 40, 60, 80, 100, 120, 140].map((val, i) => (
                <Text
                  key={i}
                  position={[8, (val / 140) * 10 - 5, 0]}
                  fontSize={0.5}
                  color="#4a5568"
                  anchorX="left"
                >
                  {val}
                </Text>
              ))}

              {/* Labels */}
              <Text
                position={[-5, 10, 0]}
                fontSize={1}
                color="#e53e3e"
                anchorX="center"
              >
                M
              </Text>
              <Text
                position={[5, -5, 0]}
                fontSize={1}
                color="#3182ce"
                anchorX="center"
              >
                S
              </Text>
            </Canvas>

            {/* Current length indicator */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
              }}
            >
              <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>
                Current Length: {length} cm
              </p>
              <p style={{ margin: '0 0 4px 0' }}>Period (T): {period} s</p>
              <p style={{ margin: '0' }}>
                T²: {(period * period).toFixed(3)} s²
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
              }}
            >
              <h3
                style={{
                  marginTop: '0',
                  marginBottom: '16px',
                  color: '#2d3748',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                Controls
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#4a5568',
                  }}
                >
                  Length: {length} cm
                </label>
                <input
                  type="range"
                  min="10"
                  max="140"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#4299e1' }}
                  disabled={isAutoRecording}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#4a5568',
                  }}
                >
                  Amplitude: {amplitude}°
                </label>
                <input
                  type="range"
                  min="10"
                  max="70"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#4299e1' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: isPlaying ? '#e53e3e' : '#38a169',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    flex: '1',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                  }}
                >
                  {isPlaying ? 'Pause' : 'Start'} Pendulum
                </button>

                <button
                  onClick={startExperiment}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#4299e1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    flex: '1',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                    fontSize: '14px',
                  }}
                  disabled={isAutoRecording}
                >
                  Auto Run Experiment
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                flexGrow: '1',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <h3
                  style={{
                    marginTop: '0',
                    color: '#2d3748',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  Experiment Data
                </h3>
                <button
                  onClick={() => setShowGraph(!showGraph)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: showGraph ? '#a0aec0' : '#4299e1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                  }}
                >
                  {showGraph ? 'Hide Graph' : 'Show Graph'}
                </button>
              </div>

              {calculateGravity() && (
                <div
                  style={{
                    backgroundColor: '#ebf8ff',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    border: '1px solid #bee3f8',
                  }}
                >
                  <p
                    style={{
                      margin: '0',
                      fontWeight: '600',
                      color: '#2b6cb0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>Calculated g:</span>
                    <span style={{ fontSize: '18px' }}>
                      {calculateGravity()} m/s²
                    </span>
                  </p>
                </div>
              )}

              {experimentData.length > 0 && (
                <div
                  style={{
                    maxHeight: '180px',
                    overflowY: 'auto',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                  }}
                >
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '14px',
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: '#f7fafc' }}>
                        <th
                          style={{
                            padding: '10px 12px',
                            textAlign: 'left',
                            borderBottom: '1px solid #e2e8f0',
                            fontWeight: '600',
                            color: '#4a5568',
                          }}
                        >
                          Length (cm)
                        </th>
                        <th
                          style={{
                            padding: '10px 12px',
                            textAlign: 'left',
                            borderBottom: '1px solid #e2e8f0',
                            fontWeight: '600',
                            color: '#4a5568',
                          }}
                        >
                          T² (s²)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {experimentData.map((data, i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: '1px solid #e2e8f0',
                            backgroundColor: i % 2 === 0 ? 'white' : '#f8fafc',
                          }}
                        >
                          <td
                            style={{
                              padding: '10px 12px',
                              color: '#2d3748',
                            }}
                          >
                            {data.length}
                          </td>
                          <td
                            style={{
                              padding: '10px 12px',
                              color: '#2d3748',
                            }}
                          >
                            {data.periodSquared}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {showGraph && experimentData.length > 0 && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                marginTop: '0',
                marginBottom: '16px',
                color: '#2d3748',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              T² vs Length Graph
            </h3>
            <Graph data={experimentData} />
          </div>
        )}
      </div>
    </div>
  );
};

// 2D Pendulum Component
function Pendulum({ length, amplitude, isPlaying }) {
  const pendulumRef = useRef();
  const bobRef = useRef();
  const stringRef = useRef();

  const lengthInMeters = length / 100; // Convert cm to m
  const angle = amplitude * (Math.PI / 180); // Convert degrees to radians

  useFrame(({ clock }) => {
    if (!isPlaying) return;

    // Calculate angular position using harmonic motion equation
    const g = 9.81;
    const angularFrequency = Math.sqrt(g / lengthInMeters);
    const time = clock.getElapsedTime();
    const currentAngle = angle * Math.cos(angularFrequency * time);

    if (pendulumRef.current) {
      pendulumRef.current.rotation.z = currentAngle;
    }

    // Update string and bob position
    if (stringRef.current && bobRef.current) {
      const stringLength = lengthInMeters * 10; // Scale for visualization
      const bobX = Math.sin(currentAngle) * stringLength;
      const bobY = -Math.cos(currentAngle) * stringLength;

      stringRef.current.scale.y = stringLength;
      stringRef.current.position.y = -stringLength / 2;

      bobRef.current.position.set(bobX, bobY - stringLength, 0);
    }
  });

  return (
    <group ref={pendulumRef} position={[0, 0, 0]}>
      {/* Pivot point */}
      <mesh position={[0, 5, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#718096" />
      </mesh>

      {/* String */}
      <group ref={stringRef} position={[0, 5, 0]}>
        <mesh>
          <planeGeometry args={[0.1, 1]} />
          <meshBasicMaterial color="#4a5568" />
        </mesh>
      </group>

      {/* Bob */}
      <mesh ref={bobRef}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#e53e3e" />
      </mesh>

      {/* Length indicator */}
      <Text position={[1.5, 5 - length / 10, 0]} fontSize={0.5} color="#4a5568">
        {length} cm
      </Text>
    </group>
  );
}

// Graph Component using SVG
function Graph({ data }) {
  if (data.length === 0) {
    return <p>No data recorded yet.</p>;
  }

  // Calculate max values for scaling
  const maxLength = Math.max(...data.map((d) => d.length));
  const maxTSquared = Math.max(...data.map((d) => parseFloat(d.periodSquared)));

  // Calculate best fit line (now with T² on x-axis and Length on y-axis)
  const n = data.length;
  const sumX = data.reduce((sum, d) => sum + parseFloat(d.periodSquared), 0);
  const sumY = data.reduce((sum, d) => sum + parseFloat(d.length), 0);
  const sumXY = data.reduce(
    (sum, d) => sum + parseFloat(d.periodSquared) * parseFloat(d.length),
    0
  );
  const sumXX = data.reduce(
    (sum, d) => sum + parseFloat(d.periodSquared) * parseFloat(d.periodSquared),
    0
  );

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return (
    <svg width="100%" height="300" viewBox="0 0 500 300">
      {/* X axis */}
      <line
        x1="50"
        y1="250"
        x2="450"
        y2="250"
        stroke="#4a5568"
        strokeWidth="2"
      />
      <text x="450" y="270" textAnchor="end" fill="#4a5568" fontSize="14">
        T² (s²)
      </text>

      {/* Y axis */}
      <line x1="50" y1="50" x2="50" y2="250" stroke="#4a5568" strokeWidth="2" />
      <text
        x="30"
        y="40"
        textAnchor="end"
        fill="#4a5568"
        fontSize="14"
        transform="rotate(-90, 30, 40)"
      >
        Length (cm)
      </text>

      {/* Grid lines */}
      {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((val) => {
        if (val > maxTSquared) return null;
        const x = 50 + (val / maxTSquared) * 400;
        return (
          <g key={`x${val}`}>
            <line
              x1={x}
              y1="50"
              x2={x}
              y2="250"
              stroke="#e2e8f0"
              strokeDasharray="2,2"
            />
            <text
              x={x}
              y="265"
              textAnchor="middle"
              fill="#718096"
              fontSize="12"
            >
              {val.toFixed(1)}
            </text>
          </g>
        );
      })}

      {[0, 20, 40, 60, 80, 100, 120, 140].map((val) => {
        if (val > maxLength) return null;
        const y = 250 - (val / maxLength) * 200;
        return (
          <g key={`y${val}`}>
            <line
              x1="50"
              y1={y}
              x2="450"
              y2={y}
              stroke="#e2e8f0"
              strokeDasharray="2,2"
            />
            <text
              x="40"
              y={y + 5}
              textAnchor="end"
              fill="#718096"
              fontSize="12"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Best fit line */}
      <line
        x1="50"
        y1={250 - (intercept / maxLength) * 200}
        x2="450"
        y2={250 - ((slope * maxTSquared + intercept) / maxLength) * 200}
        stroke="#e53e3e"
        strokeWidth="2"
        strokeDasharray="5,5"
      />

      {/* Data points */}
      {data.map((point, i) => {
        const x = 50 + (point.periodSquared / maxTSquared) * 400;
        const y = 250 - (point.length / maxLength) * 200;

        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#4299e1" />
            {i > 0 && (
              <line
                x1={50 + (data[i - 1].periodSquared / maxTSquared) * 400}
                y1={250 - (data[i - 1].length / maxLength) * 200}
                x2={x}
                y2={y}
                stroke="#4299e1"
                strokeWidth="2"
              />
            )}
          </g>
        );
      })}

      {/* Equation */}
      <text
        x="300"
        y="30"
        textAnchor="middle"
        fill="#2d3748"
        fontSize="14"
        fontWeight="500"
      >
        Calculated g: {((4 * Math.PI * Math.PI) / slope).toFixed(2)} m/s²
      </text>
    </svg>
  );
}

export default PendulumExperiment;

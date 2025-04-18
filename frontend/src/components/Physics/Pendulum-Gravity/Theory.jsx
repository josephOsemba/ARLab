import React from 'react';
import '../../../styles/Theory.css';

const Theory = () => {
  return (
    <div className="theory-section">
      <div className="content-wrapper">
        <div className="text-content">
          <h2 style={{ textAlign: 'center' }}>Theory of Pendulum Gravity</h2>

          <h3>Aim</h3>
          <p>
            This is an experiment to determine the magnitude of the acceleration
            due to gravity by using a simple pendulum.
          </p>

          <h3>Apparatus</h3>
          <ul>
            <li>A small mass (bob)</li>
            <li>2m long string</li>
            <li>Stopwatch/clock</li>
            <li>Meter rule</li>
            <li>Stand</li>
            <li>Protractor</li>
          </ul>

          <h3>Theory</h3>
          <p>
            Consider a pendulum of length <strong>l</strong> with a mass{' '}
            <strong>m</strong> at the end displaced through an angle{' '}
            <strong>θ</strong> from the vertical (Figure 1). The restoring force{' '}
            <strong>F</strong> is the component of the weight of the bob.
            Therefore:
          </p>
          <pre>
            <code>F = -mg sin(θ) = ma</code>
          </pre>
          <p>
            giving <strong>a = -g sin(θ)</strong>. But for small angles,{' '}
            <strong>sin(θ)</strong> tends to <strong>θ</strong>, and therefore:
          </p>
          <pre>
            <code>a = -gθ = -g(x/l)</code>
          </pre>
          <p>
            where <strong>x</strong> is the distance of the bob from the
            midpoint of the oscillation. The acceleration is proportional to the
            negative of the displacement, and so the pendulum moves with simple
            harmonic motion.
          </p>

          <p>
            The value of <strong>ω²</strong> is <strong>g/l</strong>, and so the
            period of a simple pendulum is:
          </p>
          <pre>
            <code>T = 2π√(l/g)</code>
          </pre>
          <p>
            This formula is accurate for small angles of swing, however. For
            large angles of swing (θ), the period is given by:
          </p>
          <pre>
            <code>
              T = 2π√[l / g (1 + [1/2²]sin²θ + [1.32/2².42]sin⁴θ + ...)]
            </code>
          </pre>
          <p>
            Although the simple formula is accurate to ±0.5% for θ &lt; 15°.
          </p>

          <p>
            A simple pendulum of length 1m has a theoretical period of swing
            (using the simple formula) of 2.006s. If the swing is now increased
            to 45°, this becomes 2.131s.
          </p>

          <h4>Theory Diagram</h4>
          <div className="image-preview-container">
            <img
              src="/assets/GRAVITY-PROCEDURE.png"
              alt="Theory and Procedure"
              className="theory-image "
              style={{ width: '70%', height: '500px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theory;

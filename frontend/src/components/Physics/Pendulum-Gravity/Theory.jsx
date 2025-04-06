import React, { useState } from 'react';
import '../../../styles/Theory.css'; 

const Theory = () => {
    const [imageTheory, setImageTheory] = useState(null);
    const [imageProcedure, setImageProcedure] = useState(null);

    const handleTheoryImageChange = (e) => {
        setImageTheory(URL.createObjectURL(e.target.files[0]));
    };

    const handleProcedureImageChange = (e) => {
        setImageProcedure(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="theory-section">
            <div className="content-wrapper">
                <div className="text-content">
                    <h2>Theory of Pendulum Gravity</h2>

                    <h3>Aim</h3>
                    <p>This is an experiment to determine the magnitude of the acceleration due to gravity at KISII UNIVERSITY by using a simple pendulum.</p>

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
                    <p>Consider a pendulum of length <strong>l</strong> with a mass <strong>m</strong> at the end displaced through an angle <strong>θ</strong> from the vertical (Figure 1). The restoring force <strong>F</strong> is the component of the weight of the bob. Therefore:</p>
                    <pre><code>F = -mg sin(θ) = ma</code></pre>
                    <p>giving <strong>a = -g sin(θ)</strong>. But for small angles, <strong>sin(θ)</strong> tends to <strong>θ</strong>, and therefore:</p>
                    <pre><code>a = -gθ = -g(x/l)</code></pre>
                    <p>where <strong>x</strong> is the distance of the bob from the midpoint of the oscillation. The acceleration is proportional to the negative of the displacement, and so the pendulum moves with simple harmonic motion.</p>
                    
                    <p>The value of <strong>ω²</strong> is <strong>g/l</strong>, and so the period of a simple pendulum is:</p>
                    <pre><code>T = 2π√(l/g)</code></pre>
                    <p>This formula is accurate for small angles of swing, however. For large angles of swing (θ), the period is given by:</p>
                    <pre><code>T = 2π√[l / g (1 + [1/2²]sin²θ + [1.32/2².42]sin⁴θ + ...)]</code></pre>

                    <p>Although the simple formula is accurate to ±0.5% for θ &lt; 15°.</p>

                    <p>A simple pendulum of length 1m has a theoretical period of swing (using the simple formula) of 2.006s. If the swing is now increased to 45°, this becomes 2.131s.</p>

                    {/* Image Upload for Theory Section */}
                    <input type="file" onChange={handleTheoryImageChange} />
                    {imageTheory && <img src={imageTheory} alt="Theory Visual" className="theory-image" />}

                    <h3>Procedure</h3>
                    <p>The measurement of the acceleration due to gravity:</p>
                    <p>A simple pendulum may be used to measure the acceleration due to gravity (g). The period is measured for a series of different values of <strong>l</strong>, and a graph is plotted of <strong>l</strong> against <strong>T²</strong>.</p>
                    <p>The gradient of this graph is <strong>l/T²</strong> and this is equal to <strong>g/4π²</strong>. Therefore, <strong>g = 4π²l / T²</strong>.</p>
                    <p>From this, the value of <strong>g</strong> can be found. Very accurate determinations by this method have been used in geophysical prospecting.</p>

                    <h4>Steps:</h4>
                    <ol>
                        <li>With the arrangement as shown in Figure 1, make <strong>l = 20cm</strong> and displace the pendulum bob slightly from the equilibrium position to some position A.</li>
                        <li>Release the bob and record the time taken for 20 oscillations, <strong>t20</strong>.</li>
                        <li>From this time, determine and record the time period <strong>T</strong>. Now increase the length, <strong>l</strong>, of the string in steps of 20cm and repeat the experiment for 5 different lengths. Draw a graph of <strong>l</strong> against <strong>T²</strong>.</li>
                        <li>Calculate the slope of the graph.</li>
                        <li>From your graph, calculate the acceleration due to gravity <strong>g</strong> and the error associated with this value. Compare your result with the standard value.</li>
                        <li>Set the length of the pendulum to about 100cm and measure the time taken for 30 complete oscillations for amplitudes, <strong>θ</strong>, ranging from 10° to 70° in steps of 10°. Hence determine the periods <strong>T1</strong>.</li>
                        <li>Plot a graph of <strong>T1</strong> against amplitude <strong>θ</strong>, and comment on your results.</li>
                    </ol>

                    {/* Image Upload for Procedure Section */}
                    <input type="file" onChange={handleProcedureImageChange} />
                    {imageProcedure && <img src={imageProcedure} alt="Procedure Visual" className="procedure-image" />}
                </div>
            </div>
        </div>
    );
};

export default Theory;

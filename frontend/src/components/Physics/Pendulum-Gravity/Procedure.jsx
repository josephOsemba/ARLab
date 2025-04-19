import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/Theory.css';

const Procedure = () => {
  return (
    <div className="theory-section">
      <div className="content-wrapper">
        <div className="text-content">
          <h2 style={{ textAlign: 'center' }}>Procedure of Pendulum Gravity</h2>

          <h3>Procedure</h3>
          <p>The measurement of the acceleration due to gravity:</p>
          <p>
            A simple pendulum may be used to measure the acceleration due to
            gravity (g). The period is measured for a series of different values
            of <strong>l</strong>, and a graph is plotted of <strong>l</strong>{' '}
            against <strong>T²</strong>.
          </p>
          <p>
            The gradient of this graph is <strong>l/T²</strong> and this is
            equal to <strong>g/4π²</strong>. Therefore,{' '}
            <strong>g = 4π²l / T²</strong>.
          </p>
          <p>
            From this, the value of <strong>g</strong> can be found. Very
            accurate determinations by this method have been used in geophysical
            prospecting.
          </p>

          <h4>Steps:</h4>
          <ol>
            <li>
              With the arrangement as shown in Figure 1, make{' '}
              <strong>l = 20cm</strong> and displace the pendulum bob slightly
              from the equilibrium position to some position A.
            </li>
            <li>
              Release the bob and record the time taken for 20 oscillations,{' '}
              <strong>t20</strong>.
            </li>
            <li>
              From this time, determine and record the time period{' '}
              <strong>T</strong>. Now increase the length, <strong>l</strong>,
              of the string in steps of 20cm and repeat the experiment for 5
              different lengths. Draw a graph of <strong>l</strong> against{' '}
              <strong>T²</strong>.
            </li>
            <li>Calculate the slope of the graph.</li>
            <li>
              From your graph, calculate the acceleration due to gravity{' '}
              <strong>g</strong> and the error associated with this value.
              Compare your result with the standard value.
            </li>
            <li>
              Set the length of the pendulum to about 100cm and measure the time
              taken for 30 complete oscillations for amplitudes,{' '}
              <strong>θ</strong>, ranging from 10° to 70° in steps of 10°. Hence
              determine the periods <strong>T1</strong>.
            </li>
            <li>
              Plot a graph of <strong>T1</strong> against amplitude{' '}
              <strong>θ</strong>, and comment on your results.
            </li>
          </ol>

          <h4>Procedure Diagram</h4>
          <div className="image-preview-container">
            <img
              src="/assets/GRAVITY-THEORY.png"
              alt="Procedure Visual"
              className="procedure-image"
              style={{ width: '70%', height: '500px' }}
            />
          </div>

          <h4 style={{ marginTop: '40px' }}>Table 1</h4>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Length (cm)</th>
                <th>Time for 20 oscillations (s)</th>
                <th>Time period (s)</th>
                <th>T² (s²)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>

          <h4 style={{ marginTop: '40px' }}>Calculations</h4>
          <ol>
            <li>
              Draw a graph of <strong>T²</strong> against <i>l</i>.
            </li>
            <hr />
            <li>Calculate the slope of the graph.</li>
          </ol>

          <hr />

          <ol start="3">
            <li>
              From your graph, determine the acceleration due to gravity{' '}
              <strong>g</strong>.
            </li>
          </ol>

          <hr />

          <h4 style={{ marginTop: '40px' }}>Table 2</h4>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>θ (°)</th>
                <th>0</th>
                <th>10</th>
                <th>20</th>
                <th>30</th>
                <th>40</th>
                <th>50</th>
                <th>60</th>
                <th>70</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>T30 (s)</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <strong>T1 (s)</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <h4 style={{ marginTop: '40px' }}>QUESTIONS</h4>
          <ol>
            <li>What are the SI units of the slope?</li>
            <hr />
            <li>Does your graph pass through origin? If not why not?</li>
            <hr />
            <li>What is the reason for timing more than one oscillation?</li>
            <hr />
            <li>
              Why must the amplitude of the oscillation be kept small, i.e.,
              less than 100?
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Procedure;

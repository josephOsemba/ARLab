// Example: Physics.jsx
import React from 'react';

const Chemistry = () => {
  return (
    <div className="subject-page">
      <h2>You are here → Home → Physical Sciences → Physics</h2>
      <h1>Physics Virtual Lab</h1>
      <p>Explore junior secondary physics practicals using interactive simulations.</p>
      <ul>
        <li><a href="/practicals/electric-circuits">Simple Electric Circuits</a></li>
        <li><a href="/practicals/magnetic-effects">Magnetic Effects of a Current</a></li>
        <li><a href="/practicals/heat-transfer">Heat Transfer</a></li>
        <li><a href="/practicals/sound-waves">Sound and Vibrations</a></li>
        <li><a href="/practicals/pressure">Pressure in Fluids</a></li>
      </ul>
    </div>
  );
};

export default Chemistry;

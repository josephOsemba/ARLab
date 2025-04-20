export const projects = {
  pendulum: {
    name: 'Pendulum Experiment',
    description: 'Simple harmonic motion simulation',
    components: [
      {
        id: 'pendulum-base',
        name: 'Pendulum Stand',
        model: '../models/3D-Models/pendulum bob.glb',
        category: 'equipment',
        scale: [1, 1, 1],
      },
      {
        id: 'pendulum-bob',
        name: 'Pendulum Bob',
        model: '../models/3D-Models/pendulum bob.glb',
        category: 'equipment',
        scale: [0.5, 0.5, 0.5],
      },
    ],
    defaultEnvironment: 'lab',
  },
};

export const environments = {
  lab: {
    skybox: '/textures/skybox/lab/',
    lighting: {
      ambientIntensity: 0.5,
      directionalIntensity: 0.8,
    },
  },
  nature: {
    skybox: '/textures/skybox/nature/',
    lighting: {
      ambientIntensity: 1.0,
      directionalIntensity: 0.5,
    },
  },
};

import Experiment from '../models/Experiment.js';

// Get experiment configuration
export const getExperimentConfig = async (req, res) => {
  try {
    const experiment = await Experiment.findOne({
      experimentId: req.params.experimentId,
    });
    if (!experiment)
      return res.status(404).json({ message: 'Experiment not found' });
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get list of all experiments
export const getExperimentList = async (req, res) => {
  try {
    const experiments = await Experiment.find(
      {},
      'experimentId name description'
    );
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

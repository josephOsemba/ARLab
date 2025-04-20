import mongoose from 'mongoose';

const experimentSchema = new mongoose.Schema({
  experimentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  requiredEquipment: { type: Array, required: true },
  defaultSceneConfig: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Experiment = mongoose.model('Experiment', experimentSchema);

export default Experiment;

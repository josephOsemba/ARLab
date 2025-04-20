import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  objects: { type: Array, required: true },
  experimentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Scene = mongoose.model('Scene', sceneSchema);

export default Scene;

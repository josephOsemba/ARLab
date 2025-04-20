export const fetchExperimentList = async () => {
  const response = await fetch('/api/experiments');
  if (!response.ok) throw new Error('Failed to fetch experiments');
  return await response.json();
};

export const fetchExperimentConfig = async (experimentId) => {
  const response = await fetch(`/api/experiments/${experimentId}`);
  if (!response.ok) throw new Error('Failed to fetch experiment config');
  return await response.json();
};

export const saveSceneConfig = async (sceneData) => {
  const response = await fetch('/api/labscene/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sceneData),
  });
  if (!response.ok) throw new Error('Failed to save scene');
  return await response.json();
};

export interface SceneObject {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  properties: Record<string, any>;
}

export interface ExperimentConfig {
  experimentId: string;
  name: string;
  description: string;
  requiredEquipment: Array<{
    type: string;
    name: string;
    icon?: string;
  }>;
  defaultSceneConfig: {
    objects: SceneObject[];
  };
}

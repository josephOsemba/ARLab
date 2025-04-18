import {
  getAllOscillations,
  seedOscillationData,
} from '../models/oscillationModel.js';

export async function getOscillations(db) {
  return getAllOscillations(db);
}

export async function seedData(db) {
  const seedData = [
    { length: 20, time20: 17.9, period: 0.895, t_squared: 0.801 },
    { length: 40, time20: 25.4, period: 1.27, t_squared: 1.6129 },
    { length: 60, time20: 31.1, period: 1.555, t_squared: 2.418 },
    { length: 80, time20: 35.9, period: 1.795, t_squared: 3.222 },
    { length: 100, time20: 40.1, period: 2.005, t_squared: 4.02 },
  ];

  await seedOscillationData(db, seedData);
  return { message: 'Database seeded successfully' };
}

import { faker } from '@faker-js/faker';
import { Game, Review } from '../types';

const categories = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Simulación', 'Carreras', 'Arcade'];
const genres = ['FPS', 'MMORPG', 'Supervivencia', 'Plataformas', 'Terror', 'Puzzle', 'Sandbox', 'Battle Royale'];

const gameImages = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
];

export const generateMockGames = (count: number): Game[] => {
  return Array.from({ length: count }, (_, index) => {
    const randomImage = gameImages[Math.floor(Math.random() * gameImages.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomGenres = faker.helpers.arrayElements(genres, { min: 1, max: 3 });
    
    return {
      id: faker.string.uuid(),
      title: faker.company.name().replace(/[^a-zA-Z0-9\s]/g, '') + ' ' + faker.word.words(1),
      description: faker.lorem.paragraphs(3),
      thumbnail: randomImage,
      screenshots: Array.from({ length: 5 }, () => randomImage + `&random=${Math.random()}`),
      category: randomCategory,
      genre: randomGenres,
      rating: Number((Math.random() * 5).toFixed(1)),
      downloads: faker.number.int({ min: 1000, max: 999999 }),
      size: `${faker.number.int({ min: 1, max: 50 })} GB`,
      releaseDate: faker.date.past({ years: 3 }).toISOString().split('T')[0],
      requirements: {
        minimum: {
          os: 'Windows 10 64-bit',
          processor: 'Intel Core i5-4590 / AMD FX 8350',
          memory: '8 GB RAM',
          graphics: 'NVIDIA GTX 970 / AMD R9 290',
          storage: `${faker.number.int({ min: 20, max: 100 })} GB`
        },
        recommended: {
          os: 'Windows 11 64-bit',
          processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
          memory: '16 GB RAM',
          graphics: 'NVIDIA RTX 3070 / AMD RX 6700 XT',
          storage: `${faker.number.int({ min: 50, max: 150 })} GB`
        }
      },
      price: faker.number.int({ min: 0, max: 60 }),
      featured: index < 6,
      popular: Math.random() > 0.7,
      new: Math.random() > 0.8,
    };
  });
};

export const generateMockReviews = (gameId: string, count: number): Review[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    gameId,
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    rating: Number((Math.random() * 5).toFixed(1)),
    comment: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
  }));
};

export const mockGames = generateMockGames(50);

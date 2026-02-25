
import { PromptReference, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Portrait', 'Landscape', 'Abstract', 'Architecture', 'Cyberpunk', 'Anime'];

export const COMMUNITY_URL = "https://discord.gg/ai-masters-community"; // Placeholder URL

export const INITIAL_DATA: PromptReference[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/cyber/800/1000',
    prompt: 'A futuristic cyberpunk city street at night, neon signs in Japanese, rain-slicked pavement reflecting vibrant pink and blue lights, cinematic lighting, 8k resolution, hyper-realistic.',
    category: 'Cyberpunk',
    author: 'NeonDreamer',
    createdAt: Date.now() - 100000
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/portrait/800/1200',
    prompt: 'Close-up portrait of a woman with freckles, ethereal lighting, soft bokeh background, wearing a crown of wildflowers, highly detailed skin texture, 85mm lens, f/1.8.',
    category: 'Portrait',
    author: 'LensMaster',
    createdAt: Date.now() - 200000
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/arch/1000/800',
    prompt: 'Modernist glass villa perched on a cliff overlooking the Mediterranean sea at sunset, brutalist architecture elements, infinity pool, warm golden hour light, architectural photography.',
    category: 'Architecture',
    author: 'SpaceDesign',
    createdAt: Date.now() - 300000
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/seed/land/1200/800',
    prompt: 'Majestic snow-capped mountain range reflecting in a crystal clear alpine lake, pine forest in the foreground, morning mist, National Geographic style, wide angle shot.',
    category: 'Landscape',
    author: 'NatureLover',
    createdAt: Date.now() - 400000
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/abstract/800/800',
    prompt: 'Fluid acrylic pour art, swirling patterns of gold, deep teal, and white, metallic textures, macro photography, abstract expressionism, high contrast.',
    category: 'Abstract',
    author: 'ArtFlow',
    createdAt: Date.now() - 500000
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/seed/anime/800/1100',
    prompt: 'Studio Ghibli style landscape, rolling green hills under a vast blue sky with fluffy white clouds, a small cottage with smoke rising from the chimney, nostalgic atmosphere.',
    category: 'Anime',
    author: 'OtakuSpirit',
    createdAt: Date.now() - 600000
  }
];

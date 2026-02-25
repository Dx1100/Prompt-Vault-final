
export interface PromptReference {
  id: string;
  imageUrl: string;
  prompt: string;
  category: string;
  author: string;
  createdAt: number;
}

export type Category = 'All' | 'Portrait' | 'Landscape' | 'Abstract' | 'Architecture' | 'Cyberpunk' | 'Anime';

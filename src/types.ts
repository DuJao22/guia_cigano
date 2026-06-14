export interface CardProblem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  text: string;
  description: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: string;
  topics: string[];
}

export interface Bonus {
  id: string;
  badge: string;
  title: string;
  description: string;
  originalPrice: string;
  icon: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  avatarText: string;
  stars: number;
  date: string;
}

export type ParticleState = 'purple' | 'dark' | 'gold' | 'portal';

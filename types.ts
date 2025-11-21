export interface Project {
  id: string;
  title: string;
  date: string;
  description: string; // Short summary for the card
  synopsis: string; // Detailed incident report
  technologies: string[];
  imageUrl: string;
  link?: string;
  classified: boolean;
  findings: string; // Results/Outcome
  challenges: string; // Technical hurdles
  evidence: Array<{ type: 'image' | 'code'; content: string; caption: string }>;
}

export interface Skill {
  category: string;
  items: string[];
}
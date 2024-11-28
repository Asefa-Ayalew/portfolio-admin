export interface Project {
    id: string; 
    title: string;
    description: string;
    technologies: string[]; 
    imageUrl: string; 
    projectUrl: string; 
    sourceCodeUrl?: string; 
    startDate: string; 
    endDate?: string; 
    tags?: string[]; 
    role: string; 
    features: string[]; 
  }
  
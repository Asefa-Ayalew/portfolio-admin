export interface SoftSkill  {
    id: string;  // UUID
    name: string;
    description: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  };
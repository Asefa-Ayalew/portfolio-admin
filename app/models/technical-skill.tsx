export interface TechnicalSkill {
    id: string; 
    name: string;
    category: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    years_of_experience: number;
}
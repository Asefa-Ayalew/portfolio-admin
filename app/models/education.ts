export interface Education {
    id?:string;
    institution: string;
    degree: string;
    startYear: Date;
    endYear: Date;
    description?: string;
}
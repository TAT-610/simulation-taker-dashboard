export interface Simulation {
  id: string;
  title: string;
  logo: string;
  role: string;
  companyName: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lastActivity: Date;
  progress: number;
  skills: string[];
  score: number;
  status: "active" | "completed" | "not_started" | "not_registed";
  lesson: string[];
}

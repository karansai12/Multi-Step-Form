export interface StepData {
  personalStepData: PersonalFormValues;
  experienceStepData: ExperienceFormValues;
  skillStepStepData: SkillsFormValues;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  phone: number;
  state: string;
  email: string;
  experience: string;
  role: string;
  skill: string[];
  bio: string;
}

export interface PersonalFormValues {
    firstName:string;
    lastName:string;
    email:string;
    phone:number;
    state: string;
}

export interface SkillsFormValues {
  skill: string[];
  bio: string;
}

export interface ExperienceFormValues {
  experience: string;
  role: string;
}
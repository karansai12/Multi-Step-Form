"use client";

import { defineStepper } from "@stepperize/react";
import PersonalStep from "./personal-step";
import ExperienceStep from "./experience-step";
import SkillStep from "./skill-step";
import ReviewStep from "./review-step";
import { Computer, FileCheck, Pen, UserRound } from "lucide-react";
import { useState } from "react";
import {
  ExperienceFormValues,
  PersonalFormValues,
  SkillsFormValues,
  StepData,
} from "./types";

const wizard = defineStepper([
  { id: "personal", title: "Personal", icon: UserRound },
  { id: "experience", title: "Exprience", icon: Computer },
  { id: "skill", title: "Skills", icon: Pen },
  { id: "review", title: "Review", icon: FileCheck },
]);

const JobApplicationForm = () => {
  const stepper = wizard.useStepper();
  const [stepData, setStepData] = useState<StepData>({
    personalStepData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: 0,
      state: "",
    },
    experienceStepData: { experience: "", role: "" },
    skillStepStepData: { skill: [], bio: "" },
  });

  const onPersonalStepNext = (data: PersonalFormValues) => {
    setStepData((prev)=>({...prev,personalStepData: data}))
    stepper.next();
  };
  const onExperienceStepNext = (data: ExperienceFormValues) => {
    setStepData((prev)=>({...prev,experienceStepData:data}))
    stepper.next();
  };
  const onSkillStepNext = (data: SkillsFormValues) => {
    setStepData((prev)=>({...prev,skillStepStepData:data}))
    stepper.next();
  };
  const onSubmitReviewStepNext = () => {
    stepper.next();
  };

  const onPrev=()=>{
    stepper.prev()
  }

  return (
    <div className="flex  flex-col items-center justify-center w-full">
      {/* Step Indicator */}
      <div>
        <h2 className="flex items-center justify-center">
          {stepper.current.title}
        </h2>
        <h3 className="flex justify-center text-blue-500 text-2xl">
          Job Application Form
        </h3>
      </div>
      {stepper.match({
        personal: () => <PersonalStep onNext={onPersonalStepNext} initialData={stepData.personalStepData}  />,
        experience: () => <ExperienceStep onNext={onExperienceStepNext} onPrev={onPrev} initialData={stepData.experienceStepData}/>,
        skill: () => <SkillStep onNext={onSkillStepNext} onPrev={onPrev} initialData={stepData.skillStepStepData}/>,
        review: () => <ReviewStep submit={onSubmitReviewStepNext} stepData={stepData} onPrev={onPrev}/>,
      })}
    </div>
  );
};

export default JobApplicationForm;

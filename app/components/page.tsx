"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { defineStepper } from "@stepperize/react";
import PersonalStep from "./personal-step/page";
import ExperienceStep from "./experience-step/page";
import SkillStep from "./skill-step/page";
import ReviewStep from "./review-step/page";

enum Steps {
  Personal,
  Exprience,
  Skills,
  Review,
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

const wizard = defineStepper([
  { id: "personal", title: "Personal" },
  { id: "experience", title: "Exprience" },
  { id: "skill", title: "Skills" },
  { id: "review", title: "Review" },
]);

const JobApplicationForm = () => {
  const stepper = wizard.useStepper();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    Steps.Personal,
  );

  const {
    handleSubmit,
    trigger,
  } = useForm<FormValues>({ mode: "onChange" });

  const handleOnPrevious = async () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleOnNext = async () => {
    let isValid = false;

    if (currentStepIndex === Steps.Personal) {
      isValid = await trigger([
        "firstName",
        "lastName",
        "phone",
        "email",
        "state",
      ]);
      if (!isValid) return;
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentStepIndex === Steps.Exprience) {
      isValid = await trigger(["experience", "role"]);
      if (!isValid) return;
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentStepIndex === Steps.Skills) {
      isValid = await trigger(["bio"]);
      if (!isValid) return;
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <div className="flex  flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Step Indicator */}
        <div>
          <h2>{stepper.current.title}</h2>
          <h3 className="flex justify-center text-blue-500 text-2xl">
            Job Application Form
          </h3>
          {stepper.match({
            personal: () => <PersonalStep />,
            experience: () => <ExperienceStep />,
            skill: () => <SkillStep />,
            review: () => <ReviewStep />,
          })}

          <button onClick={() => stepper.prev()} disabled={!stepper.canPrev}>
            Back
          </button>
          <button onClick={() => stepper.next()} disabled={!stepper.canNext}>
            Next
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2 mt-16 ">
          {currentStepIndex === Steps.Personal ? null : (
            <Button onClick={handleOnPrevious} className="bg-blue-400">
              Previous
            </Button>
          )}
          {currentStepIndex === Steps.Review ? (
            <Button className="bg-blue-400">Submit</Button>
          ) : (
            <Button className="bg-blue-400" onClick={handleOnNext}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;

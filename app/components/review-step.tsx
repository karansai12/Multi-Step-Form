"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormValues, StepData } from "./types";

interface Props {
  submit:(data:FormValues)=>void
  stepData:StepData
  onPrev:()=>void
}

const ReviewStep = ({submit,stepData,onPrev}:Props) => {
  const {
    handleSubmit,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = (data: FormValues) => {
    console.log({ data });
    submit(data)
  };
  const onPrevious = ()=>{
      onPrev()
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <span>First Name:{stepData.personalStepData.firstName}</span>
      <span>Last Name:{stepData.personalStepData.lastName}</span>
      <span>Email:{stepData.personalStepData.email}</span>
      <span>Phone:{stepData.personalStepData.phone}</span>
      <span>State:{stepData.personalStepData.state}</span>
      <span>Experience:{stepData.experienceStepData.experience}</span>
      <span>Role:{stepData.experienceStepData.role}</span>
      <span>Skills:{stepData.skillStepStepData.skill.join(", ")}</span>
      <span>Why heir:{stepData.skillStepStepData.bio}</span>
      <div className="flex justify-center">
        <Button className="bg-blue-400 p-4" onClick={onPrevious}>
          Previous
        </Button>
        <Button className="bg-blue-400 p-4">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ReviewStep;

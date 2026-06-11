"use client";

import { useForm } from "react-hook-form";
import { FormValues } from "../page";

const ReviewStep = () => {
  const {
    handleSubmit,
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  const [
    FirstName,LastName, Email, Phone, State, Experience, Role, Skill, Bio,
  ] = watch([
    "firstName", "lastName", "email", "phone", "state", "experience", "role", "skill", "bio",
  ]);

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <span>First Name:{FirstName}</span>
      <span>Last Name:{LastName}</span>
      <span>Email:{Email}</span>
      <span>Phone:{Phone}</span>
      <span>State:{State}</span>
      <span>Experience:{Experience}</span>
      <span>Role:{Role}</span>
      <span>Skills:{Skill?.join(", ")}</span>
      <span>Why heir:{Bio}</span>
    </form>
  );
};

export default ReviewStep;

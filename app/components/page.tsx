"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { indianStatesAndCities } from "../stateAndCities";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

enum Steps {
  Personal,
  Exprience,
  Skills,
  Review,
}

interface FormValues {
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
const frameworks = [
  "TypeScript",
  "Tailwind",
  "MangoDB",
  "React",
  "Node.js",
  "Zustand",
] as const;

const JobApplicationForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    Steps.Personal,
  );

  const anchor = useComboboxAnchor();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormValues>({ mode: "onChange" });

  useEffect(() => {
    register("state", { required: "This field is required" });
    register("experience", { required: "This field is required" });
  }, [register]);

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
    }else if (currentStepIndex === Steps.Skills) {
        isValid = await trigger(["skill","bio"])
        if (!isValid) return;
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const [
    FirstName,
    LastName,
    Email,
    Phone,
    State,
    Experience,
    Role,
    Skill,
    Bio,
  ] = watch([
    "firstName",
    "lastName",
    "email",
    "phone",
    "state",
    "experience",
    "role",
    "skill",
    "bio",
  ]);

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <div className="flex  flex-col items-center justify-center w-full">
      {/* Step Indicator */}
      <div className="flex ">
        <span>Steps to be done 1-2-3-4</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <h3 className="flex justify-center text-blue-500 text-2xl">
          Job Application Form
        </h3>
        <div className="mt-4 mb-8">
          {/* Step 1 Personal  */}
          <div>
            {currentStepIndex === Steps.Personal ? (
              <div>
                <div className="flex">
                  <div>
                    <span>First Name</span>
                    <Input
                      {...register("firstName", {
                        required: "This field is required",
                        validate: {
                          min: (value: string) =>
                            value.length >= 3 ? true : "atleast 3 character ",
                          max: (value: string) =>
                            value.length <= 15 ? true : "too many characters",
                        },
                      })}
                      placeholder="Cristiano"
                    />
                    <span className="text-destructive">
                      {errors.firstName?.message}
                    </span>
                  </div>
                  <div>
                    <span>Last Name</span>
                    <Input
                      {...register("lastName", {
                        required: "This field is required",
                        validate: {
                          min: (value: string) =>
                            value.length >= 3 ? true : "atleast 3 character ",
                          max: (value: string) =>
                            value.length <= 15 ? true : "too many characters",
                        },
                      })}
                      placeholder="Ronaldo"
                    />
                    <span className="text-destructive">
                      {errors.lastName?.message}
                    </span>
                  </div>
                </div>
                <div>
                  <span>Phone</span>
                  <Input
                    type="number"
                    {...register("phone", {
                      required: "This field is required",
                      validate: (value: number) =>
                        value.toString().length === 10
                          ? true
                          : "Check the Phone Number",
                    })}
                    placeholder="7777777777"
                  />
                  <span className="text-destructive">
                    {errors.phone?.message}
                  </span>
                </div>
                <div>
                  <span>Email</span>
                  <Input
                    {...register("email", {
                      required: "This field is required",
                    })}
                    type="email"
                    placeholder="ExampleCR7@gmail.com"
                  />
                </div>
                <div>
                  <span>State</span>
                  <Select
                    onValueChange={(value) =>
                      setValue("state", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>States</SelectLabel>
                        {indianStatesAndCities.map((item) => {
                          return (
                            <SelectItem value={item.state} key={item.state}>
                              {item.state}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : null}
          </div>
          {/* Step 2 Experience */}
          <div>
            {currentStepIndex === Steps.Exprience ? (
              <>
                <div>
                  <span>Years of Experience</span>
                  <Select
                    onValueChange={(value) =>
                      setValue("experience", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Experience</SelectLabel>
                        <SelectItem value="Fresher">Fresher</SelectItem>
                        <SelectItem value="1yr">1 yr</SelectItem>
                        <SelectItem value="2yr">2 yr</SelectItem>
                        <SelectItem value="3yr+">3yr+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <span>Curret role</span>
                  <Input
                    placeholder="Frontend devloper"
                    {...register("role", {
                      required: "This field is required",
                      validate: {
                        min: (value: string) => (value.length >= 6 ? true : ""),
                        max: (value: string) =>
                          value.length <= 20 ? true : "too many characters",
                      },
                    })}
                  />
                </div>
              </>
            ) : null}
          </div>
          {/* Step 3 Skills */}
          <div>
            {currentStepIndex === Steps.Skills ? (
              <>
                <div>
                  <span>Select skills</span>
                  <Combobox
                    multiple
                    autoHighlight
                    items={frameworks}
                    defaultValue={[frameworks[0]]}
                    onValueChange={(values) => setValue("skill", values)}
                  >
                    <ComboboxChips ref={anchor} className="w-full max-w-xs">
                      <ComboboxValue>
                        {(values) => (
                          <React.Fragment>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput />
                          </React.Fragment>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
                <div>
                  <span>Why should we hire you</span>
                  <Input {...register("bio")} placeholder="The G.O.A.T" />
                </div>
              </>
            ) : null}
          </div>
        </div>
        {/* Review */}
        {currentStepIndex === Steps.Review ? (
          <div className="flex flex-col">
            <span>First Name:{FirstName}</span>
            <span>Last Name:{LastName}</span>
            <span>Email:{Email}</span>
            <span>Phone:{Phone}</span>
            <span>State:{State}</span>
            <span>Experience:{Experience}</span>
            <span>Role:{Role}</span>
            <span>Skill:{frameworks?.join(", ")}</span>
            <span>Why heir:{Bio}</span>
          </div>
        ) : null}

        {/* Buttons */}
        <div className="flex justify-center gap-2 mt-16 ">
          {currentStepIndex === Steps.Personal ? null: (
            <Button onClick={handleOnPrevious} className="bg-blue-400">
              Previous
            </Button>
          )}
          {currentStepIndex === Steps.Review ? (
                <Button className="bg-blue-400">Submit</Button>
          ) : (
          (<Button  className="bg-blue-400" onClick={handleOnNext}>Next</Button>) 
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;

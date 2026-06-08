"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
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
  Name,
  Email,
  Bio,
}
interface FormValues {
  firstName: string;
  lastName: string;
  phone: number;
  state: string;
  city: string;
  email: string;
  experience: string;
  role: string;
  bio: string;
}
const frameworks = [
  "TypeScript",
  "Tailwind",
  "MangoDB",
  "React",
  "Node.js",
] as const;

const JobApplicationForm = () => {
  const anchor = useComboboxAnchor();
  const [currentStep, setCurrentStep] = useState(Steps.Name);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormValues>({ mode: "onChange" });

  const [selectedState] = watch(["state"]);

  const handleOnPrevious = () => {
    if (currentStep === Steps.Email) {
      setCurrentStep(Steps.Name);
    } else if (currentStep === Steps.Bio) {
      setCurrentStep(Steps.Email);
    }
  };

  const handleOnNext = () => {
    trigger();
    if (currentStep === Steps.Name) {
      setCurrentStep(Steps.Email);
    } else if (currentStep === Steps.Email) {
      setCurrentStep(Steps.Bio);
    } else {
      setCurrentStep(Steps.Name);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  const hasErrorsInStepOne =
    errors.firstName?.message ||
    errors.lastName?.message ||
    errors.phone?.message ||
    errors.city?.message ||
    errors.state?.message;

  const hasErrorsInStepTwo = errors.experience?.message;

  const hasError =
    currentStep === Steps.Name
      ? hasErrorsInStepOne
      : currentStep === Steps.Email
        ? hasErrorsInStepTwo
        : false;

  register("state", { required: "This field is required" });
  register("city", { required: "This field is required" });
  register("experience", { required: "This field is required" });

  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <h2 className="flex justify-center">
          {" "}
          {currentStep === Steps.Name ? <span>Step 1</span> : null}
        </h2>
        <h2 className="flex justify-center">
          {" "}
          {currentStep === Steps.Email ? <span>Step 2</span> : null}
        </h2>
        <h2 className="flex justify-center">
          {" "}
          {currentStep === Steps.Bio ? <span>Step 3</span> : null}
        </h2>
        <h3 className="flex justify-center text-blue-500 text-2xl">
          Job Application Form
        </h3>
        <div className="mt-4 mb-8">
          <div>
            {currentStep === Steps.Name ? (
              <>
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
                    {errors.firstName?.message}{" "}
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
                    {errors.lastName?.message}{" "}
                  </span>
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
                    {errors.phone?.message}{" "}
                  </span>
                </div>
                <div>
                  <span>State</span>
                  <Select
                    onValueChange={(value) => {
                      setValue("state", value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your State" />
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {indianStatesAndCities.map((item) => {
                              return (
                                <SelectItem value={item.state} key={item.state}>
                                  {item.state}
                                </SelectItem>
                              );
                            })}
                          </SelectLabel>
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                  <span className="text-destructive">
                    {errors.city?.message}{" "}
                  </span>
                </div>
                <div>
                  <span>Select Your City or nearest city</span>
                  <Select
                    onValueChange={(value) => {
                      setValue("city", value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {indianStatesAndCities
                              .find((item) => item.state === selectedState)
                              ?.cities.map((city) => {
                                return (
                                  <SelectItem value={city} key={city}>
                                    {city}
                                  </SelectItem>
                                );
                              })}
                          </SelectLabel>
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                  <span className="text-destructive">
                    {errors.city?.message}{" "}
                  </span>
                </div>
              </>
            ) : null}
          </div>
          <div>
            {currentStep === Steps.Email ? (
              <>
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
                  <span>Years of Experience</span>
                  <Select
                    onValueChange={(value) => {
                      setValue("experience", value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            <SelectItem value="Fresher"> Fresher</SelectItem>
                            <SelectItem value="1yr">1 yr</SelectItem>
                            <SelectItem value="2yr">2 yr</SelectItem>
                            <SelectItem value="3yr+">3yr +</SelectItem>
                          </SelectLabel>
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div>
                  <span>Curret role (optional)</span>
                  <Input
                    placeholder="Frontend devloper"
                    {...register("role", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </>
            ) : null}
          </div>
          <div>
            {currentStep === Steps.Bio ? (
              <>
                <div>
                  <Combobox
                    multiple
                    autoHighlight
                    items={frameworks}
                    defaultValue={[frameworks[0]]}
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
        <div className="flex justify-center gap-2 mt-16 ">
          {currentStep === Steps.Name ? null : (
            <Button onClick={handleOnPrevious} className="bg-blue-400">
              Previous
            </Button>
          )}

          {currentStep === Steps.Bio ? (
            <Button className="bg-blue-400">Submit</Button>
          ) : (
            <Button
              className="bg-blue-400"
              // disabled={!!hasError}
              onClick={handleOnNext}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;

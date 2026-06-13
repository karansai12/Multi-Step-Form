"use client";

import { indianStatesAndCities } from "./stateAndCities";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PersonalFormValues } from "./types";
import { Field, FieldLabel } from "@/components/ui/field";


interface Props {
  initialData:PersonalFormValues
  onNext:(data:PersonalFormValues)=> void
}

const PersonalStep = ({initialData,onNext}:Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<PersonalFormValues>({ mode: "onChange", defaultValues: initialData });

  useEffect(() => {
    register("state", { required: "This field is required" });
  }, [register]);

   const onSubmit = (data: PersonalFormValues) => {
      console.log({ data });
      onNext(data)
    };

  return (
    <div className="felx flex-col">
     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col h-[60]">
          <Field>
            <FieldLabel>
              First Name
            </FieldLabel>
          </Field>
          <Input
          className="w-74"
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
          <span className="text-destructive">{errors.firstName?.message}</span>
        </div>
        <div className="flex flex-col h-[60]">
         <Field>
            <FieldLabel>
              Last Name
            </FieldLabel>
          </Field>
          <Input
          className="w-74"
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
          <span className="text-destructive">{errors.lastName?.message}</span>
        </div>
      </div>
      <div className="flex flex-col h-[60]">
       <Field>
            <FieldLabel>
             Phone
            </FieldLabel>
          </Field>
        <Input
        className="w-74"
          type="number"
          {...register("phone", {
            required: "This field is required",
            validate: (value: number) =>
              value.toString().length === 10 ? true : "Check the Phone Number",
          })}
        />
        <span className="text-destructive">{errors.phone?.message}</span>
      </div>
      <div className="flex flex-col h-[60]">
        <Field>
            <FieldLabel>
              Email
            </FieldLabel>
          </Field>
        <Input
        className="w-74"
          {...register("email", {
            required: "This field is required",
          })}
          type="email"
          placeholder="ExampleCR7@gmail.com"
        />
        <span className="text-destructive">{errors.email?.message}</span>
      </div>
      <div className="flex flex-col h-[60]">
       <Field>
            <FieldLabel>
             State
            </FieldLabel>
          </Field>
        <Select
        value={getValues("state")}
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
        <span className="text-destructive">{errors.state?.message}</span>
      </div>
      <div className="flex justify-center">
        <Button  className="bg-blue-400 p-4" type="submit">Next</Button>
      </div>
      </form>
    </div>
  );
};

export default PersonalStep;

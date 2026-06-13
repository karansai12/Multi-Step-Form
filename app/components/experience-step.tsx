"use client";

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
import { ExperienceFormValues } from "./types";
import { Field,FieldLabel } from "@/components/ui/field";





interface Props {
  initialData:ExperienceFormValues
  onNext:(data:ExperienceFormValues)=>void
  onPrev:()=>void
}

const ExperienceStep = ({initialData,onNext,onPrev}:Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<ExperienceFormValues>({ mode: "onChange",defaultValues:initialData });

   const onSubmit = (data: ExperienceFormValues) => {
        console.log({ data });
        onNext(data)
      };
    const onPrevious = ()=>{
      onPrev()
    }

        useEffect(() => {
          register("experience", { required: "This field is required" });
        }, [register]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col h-[60]">
         <Field>
            <FieldLabel>
            Experience
            </FieldLabel>
          </Field>
          <Select
          value={getValues("experience")}
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
           <span className="text-destructive">{errors.experience?.message}</span>
        </div>
        <div className="flex flex-col h-[60]">
          <Field>
            <FieldLabel>
            Role
            </FieldLabel>
          </Field>
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
        <div className="flex justify-center">
        <Button  className="bg-blue-400 p-4" type="button" onClick={onPrevious}>Previous</Button>
        <Button  className="bg-blue-400 p-4" type="submit">Next</Button>
      </div>
      </form>
    </div>
  );
};

export default ExperienceStep;

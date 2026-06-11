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
import { FormValues } from "../page";
import { useEffect } from "react";

const ExperienceStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" });

   const onSubmit = (data: FormValues) => {
        console.log({ data });
      };

        useEffect(() => {
          register("experience", { required: "This field is required" });
          register("skill", { required: "Slect at least one skill " });
        }, [register]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
           <span className="text-destructive">{errors.experience?.message}</span>
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
      </form>
    </div>
  );
};

export default ExperienceStep;

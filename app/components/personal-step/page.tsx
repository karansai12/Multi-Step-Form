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
import { FormValues } from "../page";
import { useEffect } from "react";

const PersonalStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" });

  useEffect(() => {
    register("state", { required: "This field is required" });
  }, [register]);

   const onSubmit = (data: FormValues) => {
      console.log({ data });
    };

  return (
    <div>
     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
          <span className="text-destructive">{errors.firstName?.message}</span>
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
          <span className="text-destructive">{errors.lastName?.message}</span>
        </div>
      </div>
      <div>
        <span>Phone</span>
        <Input
          type="number"
          {...register("phone", {
            required: "This field is required",
            validate: (value: number) =>
              value.toString().length === 10 ? true : "Check the Phone Number",
          })}
          placeholder="7777777777"
        />
        <span className="text-destructive">{errors.phone?.message}</span>
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
        <span className="text-destructive">{errors.email?.message}</span>
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
      </form>
    </div>
  );
};

export default PersonalStep;

"use client";

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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormValues } from "../page";
import React from "react";

const frameworks = [
  "TypeScript",
  "Tailwind",
  "MangoDB",
  "React",
  "Node.js",
  "Zustand",
] as const;

const SkillStep = () => {
  const anchor = useComboboxAnchor();

   const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" });

    const onSubmit = (data: FormValues) => {
        console.log({ data });
      };
  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
             <span className="text-destructive">{errors.skill?.message}</span>
          </div>
          <div>
            <span>Why should we hire you</span>
            <Input {...register("bio")} placeholder="The G.O.A.T" />
          </div>
          </form>
    </div>
  );
};

export default SkillStep
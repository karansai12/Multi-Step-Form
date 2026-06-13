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
import React from "react";
import { Button } from "@/components/ui/button";
import { SkillsFormValues } from "./types";
import { Field, FieldLabel } from "@/components/ui/field";

interface Props {
  initialData: SkillsFormValues;
  onNext: (data: SkillsFormValues) => void;
  onPrev: () => void;
}

const frameworks = [
  "TypeScript",
  "Tailwind",
  "MangoDB",
  "React",
  "Node.js",
  "Zustand",
] as const;

const SkillStep = ({ initialData, onNext, onPrev }: Props) => {
  const anchor = useComboboxAnchor();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<SkillsFormValues>({
    mode: "onChange",
    defaultValues: initialData,
  });
  const selectedSkill= watch("skill")
  
  const onSubmit = (data: SkillsFormValues) => {
    console.log({ data });
    onNext(data);
  };

  const onPrevious = () => {
    onPrev();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col h-[60]">
          <Field>
            <FieldLabel>Skills</FieldLabel>
          </Field>
          <Combobox
            value={selectedSkill}
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
        <div className="flex flex-col h-[60]">
          <Field>
            <FieldLabel>Bio</FieldLabel>
          </Field>
          <Input {...register("bio")} placeholder="The G.O.A.T" />
        </div>
        <div className="flex justify-center">
          <Button className="bg-blue-400 p-4" onClick={onPrevious}>
            Previous
          </Button>
          <Button className="bg-blue-400 p-4" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillStep;

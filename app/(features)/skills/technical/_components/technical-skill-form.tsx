/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect } from "react";
import { TextInput, Textarea, Button, Group, Box, Select } from "@mantine/core";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useParams } from "next/navigation";
import { messagingNotification } from "@/app/shared/ui/notification/notification";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

// Zod schema for form validation
export const technicalSkillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
  yearsOfExperience: z.number(),
});

// Infer the type from the schema
type TechnicalSkill = z.infer<typeof technicalSkillSchema>;

const technicalSkillApi = EntityApi<TechnicalSkill>("technical_skills");
const useTechnicalSkillStore =
  useEntityStore<TechnicalSkill>(technicalSkillApi);

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const categories = [
  "Programming Languages",
  "Web Development",
  "Databases",
  "DevOps",
  "Machine Learning",
  "Cloud Computing",
  "Tools",
]; // Add categories as needed

const TechnicalSkillForm: React.FC<{ editMode: "new" | "detail" }> = ({
  editMode,
}) => {
  const params = useParams();
  const id = params.id;

  const { getById, selectedItem, create, update, creating, updating } =
    useTechnicalSkillStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TechnicalSkill>({
    resolver: zodResolver(technicalSkillSchema),
  });

  const onSubmit: SubmitHandler<TechnicalSkill> = async (data) => {
    console.log(data);
    const yearsOfExperience = Number(data.yearsOfExperience);
    const updatedData = { ...data, yearsOfExperience };

    if (editMode === "new") {
      try {
        await create(updatedData);
        messagingNotification({
          title: "success",
          message: "TechnicalSkill created Successfully",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "error",
          message: "Sorry TechnicalSkill not created Successfully",
          color: "red",
        });
      }
    } else if (editMode === "detail" && selectedItem) {
      try {
        await update(String(selectedItem?.id), updatedData);
        messagingNotification({
          title: "success",
          message: "TechnicalSkill Updated Successfully",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "error",
          message: "Sorry TechnicalSkill not updated Successfully",
          color: "red",
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      getById(String(id));
    }
  }, [getById, id]);

  useEffect(() => {
    if (editMode === "detail" && selectedItem) {
      reset({
        name: selectedItem?.name,
        category: selectedItem?.category || "Programming Languages", // Default category if none exists
        description: selectedItem?.description,
        proficiency: selectedItem?.proficiency || "Beginner",
        yearsOfExperience: selectedItem?.yearsOfExperience,
      });
    }
  }, [selectedItem, editMode, reset]);

  return (
    <Box className="w-full m-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-semibold mb-6">
        {editMode === "new" ? "Add Technical Skill" : "Edit Technical Skill"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          label="Technical Skill"
          placeholder="Enter technical skill"
          {...register("name")}
          error={errors.name?.message}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              label="Category"
              placeholder="Select category"
              data={categories}
              {...field} // Spread the field to handle onChange and value
              error={errors.category?.message}
            />
          )}
        />

        <Controller
          name="proficiency"
          control={control}
          render={({ field }) => (
            <Select
              label="Proficiency Level"
              placeholder="Pick proficiency level"
              data={proficiencyLevels}
              {...field} // Spread the field to handle onChange and value
              error={errors.proficiency?.message}
            />
          )}
        />

        <TextInput
          label="Years of Experience"
          placeholder="Enter years of Experience"
          {...register("yearsOfExperience", {
            // You can add validation for number here if needed
            valueAsNumber: true, // Automatically converts the input value to a number
          })}
          error={errors.yearsOfExperience?.message}
          type="number"
        />

        <Textarea
          label="Description"
          placeholder="Enter a brief description of your technical skill"
          {...register("description")}
          error={errors.description?.message}
        />

        <Group justify="start" className="mt-6 flex">
          <Button
            type="submit"
            color="green"
            loading={editMode === "new" ? creating : updating}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            {editMode === "new" ? "Save" : "Update"}
          </Button>
          {editMode === "detail" && (
            <Button
              type="button"
              color="red"
              leftSection={<IconTrash size={16} />}
            >
              {"Delete"}
            </Button>
          )}
        </Group>
      </form>
    </Box>
  );
};

export default TechnicalSkillForm;

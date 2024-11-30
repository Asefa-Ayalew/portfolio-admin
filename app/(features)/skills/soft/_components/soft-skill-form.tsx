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
export const softSkillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  proficiency: z.string().min(1, "Proficiency is required"), // Ensure proficiency is a string
});

// Infer the type from the schema
type SoftSkill = z.infer<typeof softSkillSchema>;

const softSkillApi = EntityApi<SoftSkill>("soft_skills");
const useSoftSkillStore = useEntityStore<SoftSkill>(softSkillApi);

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const SoftSkillForm: React.FC<{ editMode: "new" | "detail" }> = ({
  editMode,
}) => {
  const params = useParams();
  const id = params.id;

  const { getById, selectedItem, create, update, creating, updating } =
    useSoftSkillStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SoftSkill>({
    resolver: zodResolver(softSkillSchema),
  });

  const onSubmit: SubmitHandler<SoftSkill> = async (data) => {
    console.log(data);
    if (editMode === "new") {
      try {
        await create(data);
        messagingNotification({
          title: "success",
          message: "SoftSkill created Successfully",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "error",
          message: "Sorry SoftSkill not created Successfully",
          color: "red",
        });
      }
    } else if (editMode === "detail" && selectedItem) {
      try {
        await update(String(selectedItem?.id), data);
        messagingNotification({
          title: "success",
          message: "SoftSkill Updated Successfully",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "error",
          message: "Sorry SoftSkill not updated Successfully",
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
      // Set form values, including proficiency level (directly use proficiency value)
      reset({
        name: selectedItem?.name,
        description: selectedItem?.description,
        proficiency: selectedItem?.proficiency || "Beginner", // Default to "Beginner" if no proficiency
      });
    }
  }, [selectedItem, editMode, reset]);

  return (
    <Box className="w-full m-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-semibold  mb-6">
        {editMode === "new" ? "Add SoftSkill" : "Edit SoftSkill"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          label="Soft Skill Name"
          placeholder="Enter soft skill name"
          {...register("name")}
          error={errors.name?.message}
        />

        <Textarea
          label="Description"
          placeholder="Enter a brief description of your soft skill"
          {...register("description")}
          error={errors.description?.message}
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

export default SoftSkillForm;

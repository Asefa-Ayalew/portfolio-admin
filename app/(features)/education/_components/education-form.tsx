/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect } from "react";
import { TextInput, Textarea, Button, Group, Box } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useParams } from "next/navigation";
import { messagingNotification } from "@/app/shared/ui/notification/notification";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

// Zod schema for form validation
export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  startYear: z.date({ required_error: "Start year is required" }),
  endYear: z.date({ required_error: "End year is required" }),
  description: z.string().optional(),
});

// Infer the type from the schema
type Education = z.infer<typeof educationSchema>;

const educationApi = EntityApi<Education>("education");
const useEducationStore = useEntityStore<Education>(educationApi);

const EducationForm: React.FC<{ editMode: "new" | "detail" }> = ({
  editMode,
}) => {
  const params = useParams();
  const id = params.id;

  const { getById, selectedItem, create, update, creating, updating, deleting } =
    useEducationStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Education>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit: SubmitHandler<Education> = async (data) => {
    if (editMode === "new") {
      try {
        await create(data);
        messagingNotification({
          title: "success",
          message: "Education created Successfully",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "error",
          message: "Sorry Education not created Successfully",
          color: "red",
        });
      }
    } else if (editMode === "detail" && selectedItem) {
      try {
        await update(String(selectedItem?.id), data);
        messagingNotification({
          title: "success",
          message: "Education Updated Successfully",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "error",
          message: "Sorry Education not updated Successfully",
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

  console.log("selectedItem", selectedItem);
  useEffect(() => {
    if (editMode === "detail" && selectedItem) {
      reset({
        institution: selectedItem?.institution,
        degree: selectedItem?.degree,
        startYear: selectedItem?.startYear,
        endYear: selectedItem?.endYear,
        description: selectedItem?.description,
      });
    }
  }, [selectedItem, editMode, reset]);

  const handleDelete = async () => {
    try {
      await delete selectedItem?.id;
      messagingNotification({
        title: "Success",
        color: "green",
        message: "Project successfully deleted",
      });
    } catch (error) {
      messagingNotification({
        title: "Error",
        color: "red",
        message: "Sorry project not deleted successfully",
      });
    }
  };

  return (
    <Box className="w-full m-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-semibold mb-6">
        {editMode === "new" ? "Add Education" : "Edit Education"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          label="School Name"
          placeholder="Enter school name"
          {...register("institution")}
          error={errors.institution?.message}
        />

        <TextInput
          label="Degree"
          placeholder="Enter degree"
          {...register("degree")}
          error={errors.degree?.message}
        />

        <Box className="flex flex-col sm:flex-row sm:space-x-4">
          <TextInput
            label="Start Year"
            type="date"
            {...register("startYear", { valueAsDate: true })}
            error={errors.startYear?.message}
          />
          <TextInput
            label="End Year"
            type="date"
            {...register("endYear", { valueAsDate: true })}
            error={errors.endYear?.message}
          />
        </Box>

        <Textarea
          label="description"
          placeholder="Enter a brief description of your education"
          {...register("description")}
          error={errors.description?.message}
        />

        <Group justify="start" className="mt-6">
          <Button
            type="submit"
            color="green"
            leftSection={<IconDeviceFloppy size={16}/>}
            loading={editMode === "new" ? creating : updating}
          >
            {editMode === "new" ? "Submit" : "Update"}
          </Button>
          <Button
          type="button"
          color="red"
          leftSection={<IconTrash size={16}/>}
          loading={deleting}
          onClick={async () => {
            await handleDelete(); 
          }}
          className="text-white font-bold"
          > {"Delete"}</Button>
        </Group>
      </form>
    </Box>
  );
};

export default EducationForm;

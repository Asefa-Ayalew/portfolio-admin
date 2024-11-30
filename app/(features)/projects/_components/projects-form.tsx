"use client";

import { Project } from "@/app/models/projects";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { messagingNotification } from "@/app/shared/ui/notification/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const completedProjectsSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  technologies: z.string(),
  imageUrl: z.string().optional(),
  projectUrl: z.string().optional(),
  sourceCodeUrl: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  tags: z.string().optional(),
  role: z.string(),
  features: z.string(),
});

type CompletedProjects = z.infer<typeof completedProjectsSchema>;

const projectApi = EntityApi<Project>("projects");
const useProjectStore = useEntityStore<Project>(projectApi);

const ProjectsForm: React.FC<{
  editMode: "new" | "detail";
}> = ({ editMode }) => {
  const { selectedItem, getById, error, create, update, creating, updating } =
    useProjectStore();
  const params = useParams();
  const id = params?.id;

  const resetCalled = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompletedProjects>({
    resolver: zodResolver(completedProjectsSchema),
  });

  const onSubmit: SubmitHandler<CompletedProjects> = async (data) => {
    if (editMode === "new") {
      try {
        await create(data);
        messagingNotification({
          title: "Success",
          message: "Project successfully created!",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "Error",
          message: "Sorry project not successfully created",
          color: "red",
        });
      }
    } else if (editMode === "detail" && selectedItem) {
      try {
        await update(String(selectedItem?.id), data);
        messagingNotification({
          title: "Success",
          message: "Project successfully updated!",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "Error",
          message: "Sorry project not successfully created",
          color: "red",
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      getById(String(id));
    }
  }, [id, getById]);

  useEffect(() => {
    if (editMode === "detail" && selectedItem && !resetCalled.current) {
      reset({
        title: selectedItem?.title,
        description: selectedItem?.description,
        technologies: selectedItem?.technologies,
        imageUrl: selectedItem?.imageUrl,
        projectUrl: selectedItem?.projectUrl,
        sourceCodeUrl: selectedItem?.sourceCodeUrl,
        startDate: selectedItem?.startDate,
        endDate: selectedItem?.endDate,
        tags: selectedItem?.tags,
        role: selectedItem?.role,
        features: selectedItem?.features,
      });
      resetCalled.current = true;
    }
  }, [editMode, selectedItem, reset]);

  return (
    <Box className="w-full m-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-md font-semibold mb-6">
        {editMode === "new" ? "Add Project" : "Edit Project"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Box className="flex space-x-4">
          <TextInput
            label="Title"
            placeholder="Enter title"
            {...register("title")}
            error={errors.title?.message}
            className="w-1/2"
          />
          <TextInput
            label="Project Url"
            placeholder="Add Project Url"
            {...register("projectUrl")}
            error={errors.projectUrl?.message}
            className="w-1/2"
          />
        </Box>

        <Box className="flex space-x-4">
          <TextInput
            label="Technologies"
            placeholder="Add technologies"
            {...register("technologies")}
            error={errors.technologies?.message}
            className="w-1/2"
          />
          <TextInput
            label="Tags"
            placeholder="Add tags"
            {...register("tags")}
            error={errors.tags?.message}
            className="w-1/2"
          />
        </Box>

        <Box className="flex space-x-4">
          <TextInput
            label="Image URL"
            placeholder="Add image URL"
            {...register("imageUrl")}
            error={errors.imageUrl?.message}
            className="w-1/2"
          />
          <TextInput
            label="Source Code URL"
            placeholder="Add source code URL"
            {...register("sourceCodeUrl")}
            error={errors.sourceCodeUrl?.message}
            className="w-1/2"
          />
        </Box>

        <Box className="flex space-x-4">
          <TextInput
            label="Start Year"
            type="date"
            {...register("startDate", { valueAsDate: true })}
            error={errors.startDate?.message}
            className="w-1/2"
          />
          <TextInput
            label="End Year"
            type="date"
            {...register("endDate", { valueAsDate: true })}
            error={errors.endDate?.message}
            className="w-1/2"
          />
        </Box>

        <Box className="flex space-x-4">
          <TextInput
            label="Role"
            placeholder="Add role"
            {...register("role")}
            error={errors.role?.message}
            className="w-1/2"
          />
          <TextInput
            label="Features"
            placeholder="Add features"
            {...register("features")}
            error={errors.features?.message}
            className="w-1/2"
          />
        </Box>

        <Textarea
          label="Description"
          placeholder="Enter a brief description of your project"
          {...register("description")}
          error={errors.description?.message}
        />

        <Group justify="start" className="mt-6">
          <Button
            type="submit"
            color="green"
            loading={editMode === "new" ? creating : updating}
          >
            {editMode === "new" ? "Submit" : "Update"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ProjectsForm;

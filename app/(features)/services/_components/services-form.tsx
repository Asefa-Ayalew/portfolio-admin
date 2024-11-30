/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Service } from "@/app/models/service";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { messagingNotification } from "@/app/shared/ui/notification/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Group, Textarea, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const completedServicesSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
});

type CompletedServices = z.infer<typeof completedServicesSchema>;

const serviceApi = EntityApi<Service>("services");
const useServiceStore = useEntityStore<Service>(serviceApi);

const ServicesForm: React.FC<{
  editMode: "new" | "detail";
}> = ({ editMode }) => {
  const {
    selectedItem,
    getById,
    create,
    update,
    creating,
    updating,
    deleting,
  } = useServiceStore();
  const params = useParams();
  const id = params?.id;

  const resetCalled = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompletedServices>({
    resolver: zodResolver(completedServicesSchema),
  });

  const onSubmit: SubmitHandler<CompletedServices> = async (data) => {
    if (editMode === "new") {
      try {
        await create(data);
        messagingNotification({
          title: "Success",
          message: "Service successfully created!",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "Error",
          message: "Sorry service not successfully created",
          color: "red",
        });
      }
    } else if (editMode === "detail" && selectedItem) {
      try {
        await update(String(selectedItem?.id), data);
        messagingNotification({
          title: "Success",
          message: "Service successfully updated!",
          color: "green",
        });
      } catch (error) {
        messagingNotification({
          title: "Error",
          message: "Sorry service not successfully created",
          color: "red",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await delete selectedItem?.id;
      messagingNotification({
        title: "Success",
        color: "green",
        message: "Service successfully deleted",
      });
    } catch (error) {
      messagingNotification({
        title: "Error",
        color: "red",
        message: "Sorry service not deleted successfully",
      });
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
      });
      resetCalled.current = true;
    }
  }, [editMode, selectedItem, reset]);

  return (
    <Box className="w-full m-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-md font-semibold mb-6">
        {editMode === "new" ? "Add Service" : "Edit Service"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label="Title"
            placeholder="Enter title"
            {...register("title")}
            error={errors.title?.message}
          />
        <Textarea
          label="Description"
          placeholder="Enter a brief description of your service"
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
            {editMode === "new" ? "Submit" : "Update"}
          </Button>
          {editMode === "detail" && (
            <Button
              type="button"
              color="red"
              leftSection={<IconTrash size={16} />}
              loading={deleting}
              onClick={async () => {
                await handleDelete(); 
              }}
              className="text-white font-bold"
            >
              {"Delete"}
            </Button>
          )}
        </Group>
      </form>
    </Box>
  );
};

export default ServicesForm;

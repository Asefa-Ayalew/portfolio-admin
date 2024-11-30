/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useRouter } from "next/navigation";
import { Service } from "@/app/models/service";

const serviceApi = EntityApi<Service>("services");
const useServiceStore = useEntityStore<Service>(serviceApi);

const ServicePage = () => {

  const {
    data: services,
    totalItems,
    isLoading,
    delete: deleteService,
    getAll,
  } = useServiceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  // Call getServices only when currentPage or perPage changes
  useEffect(() => {
    getAll(currentPage, perPage);
  }, [currentPage, perPage]);

  // Pagination and perPage change handlers
  const handlePaginationChange = (page: number) => {
    return setCurrentPage(page);
  };

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };

  // Render loader while data is loading
  if (isLoading) {
    return <Loader size="xl" />;
  }
  const handleDelete = async (row: Service) => {
    console.log("row", row);
    await deleteService(String(row.id));
  };
  const handleEdit = async (row: Service) => {
    router.push(`services/detail/${row.id}`);
  };
  const actions = [
    {
      label: "Edit",
      icon: IconEdit,
      color: "black",
      onClick: (row: Service) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: IconTrash,
      color: "red",
      onClick: (row: Service) => handleDelete(row), // Pass the row ID to delete
    },
  ];
  const config = {
    visibleColumns: [
      { name: "Title", key: "title" },
      { name: "Description", key: "description" }
    ],
  };
  return (
    <div>
      <EntityList
        data={services}
        config={config}
        totalCount={totalItems ?? 0}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={handlePaginationChange}
        onPerPageChange={handlePerPageChange}
        actions={actions}
        showDetail={true}
      />
    </div>
  );
};

export default ServicePage;

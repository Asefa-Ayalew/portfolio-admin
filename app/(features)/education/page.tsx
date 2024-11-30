"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { Education } from "@/app/models/education";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useRouter } from "next/navigation";

const educationApi = EntityApi<Education>("education");
const useEducationStore = useEntityStore<Education>(educationApi);

const EducationPage = () => {
  const { data:educations, totalItems, isLoading, getAll, delete: deleteEducation } =
    useEducationStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  // Call getEducations only when currentPage or perPage changes
  useEffect(() => {
    getAll(currentPage, perPage);
  }, [currentPage, perPage]);

  // Pagination and perPage change handlers
  const handlePaginationChange = (page: number) => {
    return setCurrentPage(page)};

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };

  // Render loader while data is loading
  if (isLoading) {
    return <Loader size="xl" />;
  }
  const handleDelete = async (row: any) => {
    console.log("row", row);
    await deleteEducation(row.id);
  };
  const handleEdit = async (row: Education) => {
    router.push(`education/detail/${row.id}`);
  };
  const config = {
    visibleColumns: [
      { name: "Institution", key: "institution" },
      { name: "Degree", key: "degree" },
      { name: "Start year", key: "startYear" },
      { name: "End year", key: "endYear" },
      { name: "Description", key: "description" },
    ],
  };
  const actions = [
    {
      label: "Edit",
      icon: IconEdit,
      color: "black",
      onClick: (row: any) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: IconTrash,
      color: "red",
      onClick: (row: any) => handleDelete(row), // Pass the row ID to delete
    },
  ];
  return (
    <div>
      <EntityList
        data={educations}
        config={config}
        totalCount={totalItems ?? 0}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={handlePaginationChange}
        onPerPageChange={handlePerPageChange}
        actions={actions}
      />
    </div>
  );
};

export default EducationPage;

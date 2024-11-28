"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { Education } from "@/app/models/education";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";

const educationApi = EntityApi<Education>("education");
const useEducationStore = useEntityStore<Education>(educationApi);

const EducationPage = () => {
  const { data:educations, totalItems, isLoading, getAll } =
    useEducationStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
  const actions = [
    {
      label: "Edit",
      icon: IconEdit,
      onClick: (row: any) => alert(`Edit action for ${row.name}`),
    },
    {
      label: "Delete",
      icon: IconTrash,
      onClick: (row: any) => alert(`Delete action for ${row.name}`),
    },
  ];
  const config = {
    visibleColumns: [
      { name: "Institution", key: "institution" },
      { name: "Degree", key: "degree" },
      { name: "Start year", key: "startYear" },
      { name: "End year", key: "endYear" },
      { name: "Description", key: "description" },
    ],
  };

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

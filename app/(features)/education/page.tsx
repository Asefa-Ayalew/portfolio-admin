"use client";
import React, { useEffect, useState } from "react";
import { useEducationStore } from "./store/education.store";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";

const EducationPage = () => {
  const { educations, totalEducation, isLoading, getEducations } =
    useEducationStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Call getEducations only when currentPage or perPage changes
  useEffect(() => {
    getEducations(currentPage, perPage);
  }, [currentPage, perPage]);

  // Pagination and perPage change handlers
  const handlePaginationChange = (page: number) => setCurrentPage(page);

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
        totalCount={totalEducation ?? 0}
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

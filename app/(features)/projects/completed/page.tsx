"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { Project } from "@/app/models/projects";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";

const projectApi = EntityApi<Project>("projects");
const useProjectStore = useEntityStore<Project>(projectApi);

const ProjectPage = () => {
  const { data:projects, totalItems, isLoading, getAll } =
    useProjectStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Call getProjects only when currentPage or perPage changes
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
      { name: "Title", key: "title" },
      { name: "Technologies", key: "technologies" },
      { name: "Role", key: "role" },
      { name: "startDate", key: "endDate" },
      { name: "features", key: "features" },
    ],
  };

  return (
    <div>
      <EntityList
        data={projects}
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

export default ProjectPage;

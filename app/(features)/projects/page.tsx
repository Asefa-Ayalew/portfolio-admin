/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Box, Center, Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { Project } from "@/app/models/projects";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useRouter } from "next/navigation";

const projectApi = EntityApi<Project>("projects");
const useProjectStore = useEntityStore<Project>(projectApi);

const ProjectPage = () => {
  const {
    data: projects,
    totalItems,
    isLoading,
    delete: deleteProject,
    getAll,
  } = useProjectStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  // Call getProjects only when currentPage or perPage changes
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

  const handleDelete = async (row: Project) => {
    console.log("row", row);
    await deleteProject(String(row.id));
  };
  const handleEdit = async (row: Project) => {
    router.push(`projects/detail/${row.id}`);
  };
  const actions = [
    {
      label: "Edit",
      icon: IconEdit,
      color: "black",
      onClick: (row: Project) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: IconTrash,
      color: "red",
      onClick: (row: Project) => handleDelete(row), // Pass the row ID to delete
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
    <Box>
      {isLoading ? (
        <Center style={{ height: "100vh" }}>
          <Loader size="md" />
        </Center>
      ) : (
        <EntityList
          data={projects}
          config={config}
          totalCount={totalItems ?? 0}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={handlePaginationChange}
          onPerPageChange={handlePerPageChange}
          actions={actions}
          showDetail={true}
        />
      )}
    </Box>
  );
};

export default ProjectPage;

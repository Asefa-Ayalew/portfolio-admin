"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Loader, Center, Box } from "@mantine/core"; // Center loader for better alignment
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { Education } from "@/app/models/education";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useRouter } from "next/navigation";

const educationApi = EntityApi<Education>("education");
const useEducationStore = useEntityStore<Education>(educationApi);

const EducationPage = () => {
  const {
    data: educations,
    totalItems,
    isLoading,
    getAll,
    delete: deleteEducation,
  } = useEducationStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getAll(currentPage, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };

  const handleDelete = async (row: Education) => {
    console.log("Deleting education:", row);
    await deleteEducation(String(row.id));
  };

  const handleEdit = (row: Education) => {
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
      onClick: handleEdit,
    },
    {
      label: "Delete",
      icon: IconTrash,
      color: "red",
      onClick: handleDelete,
    },
  ];

  return (
    <Box>
      {isLoading ? (
        <Center style={{ height: "100vh" }}>
          <Loader size="md" />
        </Center>
      ) : (
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
      )}
    </Box>
  );
};

export default EducationPage;

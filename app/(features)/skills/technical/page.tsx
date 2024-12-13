/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Box, Center, Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useRouter } from "next/navigation";
import { TechnicalSkill } from "@/app/models/technical-skill";

const technicalSkillApi = EntityApi<TechnicalSkill>("technical_skills");
const useTechnicalSkillStore = useEntityStore<TechnicalSkill>(technicalSkillApi);

const TechnicalSkillPage = () => {

  const {
    data: technicalSkills,
    totalItems,
    isLoading,
    delete: deleteTechnicalSkill,
    getAll,
  } = useTechnicalSkillStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  // Call getTechnicalSkills only when currentPage or perPage changes
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

  const handleDelete = async (row: TechnicalSkill) => {
    console.log("row", row);
    await deleteTechnicalSkill(row.id);
  };
  const handleEdit = async (row: TechnicalSkill) => {
    router.push(`skills/technical/detail/${row.id}`);
  };
  const actions = [
    {
      label: "Edit",
      icon: IconEdit,
      color: "black",
      onClick: (row: TechnicalSkill) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: IconTrash,
      color: "red",
      onClick: (row: TechnicalSkill) => handleDelete(row), // Pass the row ID to delete
    },
  ];
  const config = {
    visibleColumns: [
      { name: "Name", key: "name" },
      { name: "Description", key: "description" },
      { name: "Proficiency", key: "proficiency" },
      { name: "Years of Experience", key: "yearsOfExperience"}
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
        data={technicalSkills}
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

export default TechnicalSkillPage;

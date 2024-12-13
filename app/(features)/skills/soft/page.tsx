/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { EntityList } from "@/app/shared/ui/entity/entity-list";
import { Box, Center, Loader } from "@mantine/core"; // For loading indicator
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { useRouter } from "next/navigation";
import { SoftSkill } from "@/app/models/soft-skill";

const softSkillApi = EntityApi<SoftSkill>("soft_skills");
const useSoftSkillStore = useEntityStore<SoftSkill>(softSkillApi);

const SoftSkillPage = () => {

  const {
    data: softSkills,
    totalItems,
    isLoading,
    delete: deleteSoftSkill,
    getAll,
  } = useSoftSkillStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  // Call getSoftSkills only when currentPage or perPage changes
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

  const handleDelete = async (row: SoftSkill) => {
    console.log("row", row);
    await deleteSoftSkill(row.id);
  };
  const handleEdit = async (row: SoftSkill) => {
    router.push(`skills/soft/detail/${row.id}`);
  };
  const actions = [
    {
      label: "Edit",
      icon: IconEdit,
      color: "black",
      onClick: (row: SoftSkill) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: IconTrash,
      color: "red",
      onClick: (row: SoftSkill) => handleDelete(row), // Pass the row ID to delete
    },
  ];
  const config = {
    visibleColumns: [
      { name: "Name", key: "name" },
      { name: "Description", key: "description" },
      { name: "Proficiency", key: "proficiency" }
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
        data={softSkills}
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

export default SoftSkillPage;

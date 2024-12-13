"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Title,
  Text,
  Badge,
  Box,
  Center,
  Loader,
  Tabs,
} from "@mantine/core";
import { EntityApi } from "@/app/shared/ui/entity/api/entity-api";
import { useEntityStore } from "@/app/shared/ui/entity/store/entity-store";
import { Education } from "@/app/models/education";
import {
  IconBook,
  IconBriefcase,
  IconCup,
  IconGauge,
  IconNotification,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Project } from "@/app/models/projects";
import { SoftSkill } from "@/app/models/soft-skill";
import { TechnicalSkill } from "@/app/models/technical-skill";

const educationApi = EntityApi<Education>("education");
const useEducationStore = useEntityStore<Education>(educationApi);

const projectsApi = EntityApi<Project>("projects");
const useProjectStore = useEntityStore<Project>(projectsApi);

const softSkillApi = EntityApi<SoftSkill>("softSkills");
const useSoftSkillsStore = useEntityStore<SoftSkill>(softSkillApi);

const technicalSkillApi = EntityApi<TechnicalSkill>("technicalSkills");
const useTechnicalSkillsStore =
  useEntityStore<TechnicalSkill>(technicalSkillApi);

const Dashboard = () => {
  const {
    data: educations,
    totalItems: totalEducations,
    isLoading: educationsLoading,
    getAll: getEducations,
  } = useEducationStore();

  const {
    data: projects,
    totalItems: totalProjects,
    isLoading: projectsLoading,
    getAll: getProjects,
  } = useProjectStore();

  const {
    data: softSkills,
    totalItems: totalSoftSkills,
    isLoading: softSkillsLaoding,
    getAll: getSoftSkills,
  } = useEducationStore();
  const {
    data: technicalSkills,
    totalItems: totalTechnicalSkills,
    isLoading: technicalSkillsLaoding,
    getAll: getTechnicalSkills,
  } = useEducationStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getEducations(currentPage, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);
  useEffect(() => {
    getProjects(currentPage, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);
  useEffect(() => {
    getSoftSkills(currentPage, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);
  useEffect(() => {
    getTechnicalSkills(currentPage, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to page 1 when perPage changes
  };
  return (
    <Box>
      {educationsLoading ||
      projectsLoading ||
      softSkillsLaoding ||
      technicalSkillsLaoding ? (
        <Center style={{ height: "100vh" }}>
          <Loader size="md" />
        </Center>
      ) : (
        <Box className="p-6 min-h-screen bg-white">
          {/* Header Section */}
          <Tabs defaultValue="dashboard">
            <Tabs.List>
              <Tabs.Tab value="dashboard" leftSection={<IconGauge />}>
                Dashboard
              </Tabs.Tab>
              <Tabs.Tab value="notification" leftSection={<IconNotification />}>
                Notification
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dashboard">
              {/* Portfolio Sections */}
              <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 my-2">
                {/* Education */}
                <Card shadow="sm" radius="md" withBorder>
                  <Box className="flex space-x-2">
                    <IconCup size="48" className="text-green-600" />
                    <Box className="mt-1">
                      <h1 className="text-md">{totalEducations} Educations</h1>
                      <h2 className="text-xs">Completed educations</h2>
                    </Box>
                  </Box>
                </Card>
                {/* Projects */}
                <Card shadow="sm" radius="md" withBorder>
                  <Box className="flex space-x-2">
                    <IconBriefcase size="48" className="text-green-600" />
                    <Box className="mt-1">
                      <h1 className="text-md">{totalProjects} Projects</h1>
                      <h2 className="text-xs">Completed Projects</h2>
                    </Box>
                  </Box>
                </Card>
                {/* Soft Skills */}
                <Card shadow="sm" radius="md" withBorder>
                  <Box className="flex space-x-2">
                    <IconCup size="48" className="text-green-600" />
                    <Box className="mt-1">
                      <h1 className="text-md">{totalSoftSkills} Soft skills</h1>
                      <h2 className="text-xs">soft skills</h2>
                    </Box>
                  </Box>
                </Card>
              </section>

              {/* Detailed Tables */}
              <section>
                <Card shadow="sm" radius="md" withBorder className=" p-6 mb-6">
                  <Title order={4} className="text-gray-700 mb-4">
                    Recent Projects
                  </Title>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">
                        E-Service Application
                      </span>
                      <Badge color="blue">In Progress</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">
                        EGP Management System
                      </span>
                      <Badge color="green">Completed</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Portfolio Website</span>
                      <Badge color="teal">Under Review</Badge>
                    </li>
                  </ul>
                </Card>

                <Card shadow="sm" radius="md" className=" p-6">
                  <Title order={4} className="text-gray-700 mb-4">
                    Skillset Overview
                  </Title>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">React</span>
                      <Badge color="green">Expert</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Angular</span>
                      <Badge color="green">Advanced</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Next.js</span>
                      <Badge color="blue">Intermediate</Badge>
                    </li>
                  </ul>
                </Card>
              </section>
            </Tabs.Panel>
            <Tabs.Panel value="notification">Notification tab content</Tabs.Panel>
          </Tabs>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

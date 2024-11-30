"use client";

import React from "react";
import { Card, Title, Text, Button, Badge } from "@mantine/core";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <Title order={2} className="font-bold">
              Dashboard
            </Title>
            <Text size="sm" className="opacity-90">
              Welcome, Here&apos;s a summary of my portfolio.
            </Text>
          </div>
          <Button variant="light" color="white" radius="xl">
            Update Portfolio
          </Button>
        </div>
      </header>

      {/* Portfolio Sections */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Education */}
        <Card shadow="sm" radius="md" className="bg-white p-6">
          <Title order={4} className="text-gray-700">
            Education
          </Title>
          <Text className="text-2xl font-semibold text-purple-500 mt-2">
            3 Entries
          </Text>
          <Badge size="sm" color="teal" className="mt-4">
            Updated 2 weeks ago
          </Badge>
        </Card>

        {/* Projects */}
        <Card shadow="sm" radius="md" className="bg-white p-6">
          <Title order={4} className="text-gray-700">
            Projects
          </Title>
          <Text className="text-2xl font-semibold text-blue-500 mt-2">
            12 Projects
          </Text>
          <Badge size="sm" color="blue" className="mt-4">
            New Project Added
          </Badge>
        </Card>

        {/* Skills */}
        <Card shadow="sm" radius="md" className="bg-white p-6">
          <Title order={4} className="text-gray-700">
            Skills
          </Title>
          <Text className="text-2xl font-semibold text-green-500 mt-2">
            20 Skills
          </Text>
          <Badge size="sm" color="green" className="mt-4">
            Highly Rated
          </Badge>
        </Card>

        {/* Achievements */}
        <Card shadow="sm" radius="md" className="bg-white p-6">
          <Title order={4} className="text-gray-700">
            Achievements
          </Title>
          <Text className="text-2xl font-semibold text-yellow-500 mt-2">
            5 Awards
          </Text>
          <Badge size="sm" color="yellow" className="mt-4">
            Recently Added
          </Badge>
        </Card>
      </section>

      {/* Detailed Tables */}
      <section>
        <Card shadow="sm" radius="md" className="bg-white p-6 mb-6">
          <Title order={4} className="text-gray-700 mb-4">
            Recent Projects
          </Title>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-700">E-Service Application</span>
              <Badge color="blue">In Progress</Badge>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">EGP Management System</span>
              <Badge color="green">Completed</Badge>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Portfolio Website</span>
              <Badge color="teal">Under Review</Badge>
            </li>
          </ul>
        </Card>

        <Card shadow="sm" radius="md" className="bg-white p-6">
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
    </div>
  );
};

export default Dashboard;

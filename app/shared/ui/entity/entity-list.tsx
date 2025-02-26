"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Pagination,
  Center,
  Select,
  Popover,
  ActionIcon,
  Stack,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconDotsVertical,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
interface Action {
  label: string;
  icon: React.ElementType;
  color: string;
  onClick: (row: any) => void;
}
interface ColumnConfig {
  name: string;
  key: string;
}

interface EntityListProps {
  data: any[];
  config: { visibleColumns: ColumnConfig[] };
  totalCount: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  actions: Action[];
  showDetail?: boolean;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconChevronDown;
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          {Icon && (
            <Center>
              <Icon size={16} stroke={1.5} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export function EntityList({
  data,
  config,
  totalCount,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
  actions,
  showDetail
}: EntityListProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path


  const setSorting = (key: string) => {
    const reversed = key === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(key);
    setSortedData(
      [...data].sort((a, b) =>
        reversed
          ? b[key]?.toString().localeCompare(a[key]?.toString())
          : a[key]?.toString().localeCompare(b[key]?.toString())
      )
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value.toLowerCase().trim();
    setSearch(query);
    setSortedData(
      data.filter((item) =>
        config?.visibleColumns.some((column) =>
          item[column.key]?.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  const rows = sortedData.map((row, rowIndex) => (
    <Table.Tr key={rowIndex} className="hover:bg-gray-200">
      {config?.visibleColumns.map((column) => (
        <Table.Td key={column.key}>{row[column.key] || "-"}</Table.Td>
      ))}
      <Table.Td>
      {showDetail ? (
        <ActionIcon
          onClick={() => router.push(`${pathname}/detail/${row.id}`)} // Replace `row.id` with the appropriate ID key
          styles={(theme) => ({
            root: {
              backgroundColor: "transparent", // No background
              ":hover": {
                backgroundColor: theme.colors.gray[0], 
                // Light gray hover
              },
            },
          })}
        >
        <IconChevronRight size={16} className="text-gray-900" />
        </ActionIcon>
      ) : (
        <ActionPopover actions={actions} row={row} />
      )}
    </Table.Td>
    </Table.Tr>
  ));

  const newAction = () => {
    router.push(`${pathname}/new`);
  };
  

  return (
    <ScrollArea className="m-3 bg-white border border-gray-200">
      <Box className="flex justify-between min-h-10 text-justify items-center mx-2">
        <h1>Test Header</h1>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={newAction}
          variant="primary"
        >
          New
        </Button>
      </Box>
      <Divider />
      <Box className="flex justify-end">
        <TextInput
          placeholder="Search"
          leftSection={<IconSearch size={12} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          className="w-1/3 my-2 mr-1"
        />
      </Box>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Thead>
          <Table.Tr className="bg-gray-200">
            {config?.visibleColumns.map((column) => (
              <Th
                key={column.key}
                sorted={sortBy === column.key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(column.key)}
              >
                {column.name}
              </Th>
            ))}
            <Table.Th className="w-20"></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={config?.visibleColumns.length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Box className="mt-4 flex justify-end items-center m-2 space-x-2">
        <Pagination
          total={Math.ceil(totalCount / perPage)}
          value={currentPage}
          onChange={onPageChange}
          siblings={1}
          size="sm"
        />
        <Select
          value={perPage?.toString()}
          onChange={(value) => onPerPageChange(Number(value))}
          data={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
          ]}
          className="w-24"
        />
      </Box>
    </ScrollArea>
  );
}

function ActionPopover({ actions, row }: { actions: Action[]; row: any }) {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon
          onClick={() => setOpened((o) => !o)}
          styles={(theme) => ({
            root: {
              backgroundColor: "transparent", // No background
              ":hover": {
                backgroundColor: theme.colors.gray[0], // Light gray hover
              },
            },
          })}
        >
          <IconDotsVertical size={16} className="text-gray-900" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          {actions?.map((action, index) => (
              <Button
              key={index}
              leftSection={<action.icon size={16} />}
              variant="white"
              size="xs"
              onClick={() => action.onClick(row)}
              style={{
                backgroundColor: "transparent", // Ensure no background color by default
                color: action.color, // Ensure text color is gray-900
              }}
              onMouseEnter={(e) => {
                // Apply hover effect on mouse enter
                e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                // Reset hover effect on mouse leave
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

"use client"
import React from 'react';
import { TextInput, Textarea, Button, Group, Box } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEducationStore } from '../store/education.store';

// Zod schema for form validation
export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  startYear: z.date({ required_error: 'Start year is required' }),
  endYear: z.date({ required_error: 'End year is required' }),
  description: z.string().optional(),
});

// Infer the type from the schema
type Education = z.infer<typeof educationSchema>;

const EducationForm: React.FC<{ editMode: 'new' | 'detail' }> = ({ editMode }) => {
  const {createEducation} = useEducationStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Education>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit: SubmitHandler<Education> = async (data) => {
    try {
      await createEducation(data);
      console.log('Education added successfully:', data);
    } catch (error) {
      console.error('Error adding education:', error);
    }
  };

  return (
    <Box className="w-full m-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {editMode === 'new' ? 'Add Education' : 'Edit Education'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          label="School Name"
          placeholder="Enter school name"
          {...register('institution')}
          error={errors.institution?.message}
        />

        <TextInput
          label="Degree"
          placeholder="Enter degree"
          {...register('degree')}
          error={errors.degree?.message}
        />

        <Box className="flex flex-col sm:flex-row sm:space-x-4">
          <TextInput
            label="Start Year"
            type="date"
            {...register('startYear', { valueAsDate: true })}
            error={errors.startYear?.message}
          />
          <TextInput
            label="End Year"
            type="date"
            {...register('endYear', { valueAsDate: true })}
            error={errors.endYear?.message}
          />
        </Box>

        <Textarea
          label="description"
          placeholder="Enter a brief description of your education"
          {...register('description')}
          error={errors.description?.message}
        />

        <Group justify="start" className="mt-6">
          <Button type="submit" color="green">
            {editMode === 'new' ? 'Submit' : 'Update'}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default EducationForm;

'use client';

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { supabase } from './supabase-client';
import { useRouter } from 'next/navigation'; // Import the router hook

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const theme = useMantineTheme();
  const router = useRouter(); 

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email format'),
      name: (val) =>
        type === 'register' && val.trim().length === 0
          ? 'Name is required for registration'
          : null,
      password: (val) =>
        val.length < 6 ? 'Password should be at least 6 characters' : null,
      terms: (val) =>
        type === 'register' && !val ? 'You must accept terms and conditions' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (type === 'register') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (signUpError) throw new Error(signUpError.message);

        const user = data?.user;

        if (user?.email_confirmed_at) {
          setSuccessMessage('Registration successful! Your email is confirmed.');
        } else {
          setSuccessMessage('Registration successful! Please check your email to confirm your account.');
        }
      } else if (type === 'login') {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (signInError) throw new Error(signInError.message);

        const session = data?.session;
        if (session) {
          // Store session information in localStorage
          localStorage.setItem('userSession', JSON.stringify(session));

          // Redirect to the dashboard page
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ maxWidth: 400, margin: 'auto' }}
      {...props}
    >
      <Text size="lg" className="font-bold items-center" color={theme.primaryColor}>
        {type === 'login' ? 'Welcome Back!' : 'Create Your Account'}
      </Text>

      {error && (
        <Text color="red" size="sm" mt="md" className="items-center">
          {error}
        </Text>
      )}

      {successMessage && (
        <Text color="green" size="sm" mt="md" className="items-center">
          {successMessage}
        </Text>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack mt="md">
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name}
              radius="md"
              required
            />
          )}

          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
            required
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              error={form.errors.terms}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

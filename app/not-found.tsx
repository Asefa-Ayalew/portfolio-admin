// app/not-found.tsx
"use client"
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');  // Navigate to the homepage
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Title order={1}>404 - Page Not Found</Title>
        <Text mt="md" size="lg">
          Sorry, the page you're looking for doesn't exist.
        </Text>
        <Group className='justify-center' mt="md">
          <Button onClick={handleBackToHome} variant="outline">Go back to Homepage</Button>
        </Group>
      </div>
    </Container>
  );
};

export default NotFoundPage;

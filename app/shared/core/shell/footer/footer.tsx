"use client"
import { Container, Group, Text, Anchor, Button, Divider, Stack } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact'); // Navigate to contact section or page
  };

  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <Container>
        <Stack className='space-x-3' align="center">
          <div className="flex justify-center space-x-6">
            <Anchor href="https://github.com/asefa-ayalew" target="_blank">
              <IconBrandGithub size={24} />
            </Anchor>
            <Anchor href="https://www.linkedin.com/in/asefa-ayalew" target="_blank">
              <IconBrandLinkedin size={24} />
            </Anchor>
            <Anchor href="https://twitter.com/asefa-ayalew" target="_blank">
              <IconBrandTwitter size={24} />
            </Anchor>
          </div>

          <Divider my="sm" color="gray" />

          <Text className='text-center' size="sm">
            © 2024 Asefa Ayalew. All rights reserved.
          </Text>

          <Group className='flex justify-center items-center space-x-3'>
            <Button variant="outline" onClick={handleContactClick} size="sm">
              Contact Me
            </Button>
          </Group>

          <Text className='text-center' size="xs">
            Built with Next.js, Mantine, and TailwindCSS.
          </Text>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;

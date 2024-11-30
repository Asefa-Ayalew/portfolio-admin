import { showNotification } from '@mantine/notifications';
import { IconCheck, IconInfoCircle, IconInfoCircleFilled, IconX } from '@tabler/icons-react';

type NotificationProps = {
  title?: string;
  message: string;
  color: 'green' | 'red' | 'blue' | 'yellow';
};

export const messagingNotification = ({ title, message, color }: NotificationProps) => {
  const iconMap = {
    green: <IconCheck />,
    red: <IconX />,
    blue: <IconInfoCircle />,
    yellow: <IconInfoCircleFilled />,
  };

  showNotification({
    title: title || 'Notification',
    message,
    color,
    icon: iconMap[color],
  });
};

import { Box } from "@mantine/core";
import React, { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = now.toLocaleDateString("en-US");
      setTime(formattedTime);
      setDate(formattedDate);
    };

    // Update time immediately and set interval to refresh every second
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="items-center p-2 ml-2    flex space-x-4">
      <Box className="text-lg font-semibold">{time}</Box>
      <Box className="text-sm">{date}</Box>
    </div>
  );
};

export default DateTimeDisplay;

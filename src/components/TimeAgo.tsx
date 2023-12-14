import { useEffect, useState } from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";

interface TimeAgoProps {
  timestamp: Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const [timeDifference, setTimeDifference] = useState<string>("");
  const textColor = useColorModeValue("gray.900", "gray.300");

  useEffect(() => {
    const now = new Date();

    const timeDiff = now.getTime() - timestamp.getTime();

    const calculateTimeAgo = () => {
      const minutes = Math.floor(timeDiff / (60 * 1000));
      const hours = Math.floor(timeDiff / (60 * 60 * 1000));
      const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

      let result = "";

      if (days > 0) {
        result += `${days} day${days > 1 ? "s" : ""} ago`;
      } else if (hours > 0) {
        result += `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (minutes > 0) {
        result += `${minutes} minute${minutes > 1 ? "s" : ""} ago `;
      } else {
        result = "Just now";
      }

      setTimeDifference(result.trim());
    };

    const updateInterval = setInterval(calculateTimeAgo, 60000);

    calculateTimeAgo();

    return () => clearInterval(updateInterval);
  }, [timestamp]);

  return (
    <Text color={textColor} fontSize={"xs"}>
      {timeDifference}
    </Text>
  );
};

export default TimeAgo;

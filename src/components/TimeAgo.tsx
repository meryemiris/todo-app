import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

interface TimeAgoProps {
  timestamp: Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const [timeDifference, setTimeDifference] = useState<string>("");
  console.log("Timestamp:", timestamp);

  useEffect(() => {
    const now = new Date();

    const timeDiff = now.getTime() - timestamp.getTime();
    let result = "";

    const calculateTimeAgo = () => {
      const minutes = Math.floor(timeDiff / (60 * 1000));
      const hours = Math.floor(timeDiff / (60 * 60 * 1000));
      const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

      if (days > 0) {
        result += `${days} day${days > 1 ? "s" : ""} `;
      }
      if (hours > 0) {
        result += `${hours} hour${hours > 1 ? "s" : ""} `;
      }

      if (minutes > 0) {
        result = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else {
        result = "Less than a minute ago";
      }

      setTimeDifference(result.trim());
    };

    const updateInterval = setInterval(calculateTimeAgo, 60000);

    calculateTimeAgo();

    return () => clearInterval(updateInterval);
  }, [timestamp]);

  return <Text>{timeDifference}</Text>;
};

export default TimeAgo;

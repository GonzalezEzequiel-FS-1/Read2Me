import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";

export const ServerHealth = () => {
  const [serverHealth, setServerHealth] = useState("SERVER CHECK NOT RUNNING");
  const [responseColor, setResponseColor] = useState("#a8a29e");
  const [isError, setIsError] = useState(false);

  const DBURL = import.meta.env.VITE_DBURL;

  const checkServerHealth = async () => {
    try {
      const response = await axios.get(`${DBURL}/test`);
      const success = response.data.success;

      if (success === true) {
        setIsError(false);
        setResponseColor("#22c55e");
        setServerHealth("ALL SYSTEMS ONLINE");
      }
    } catch (err) {
      setIsError(true);
      setResponseColor("#ef4444");
      setServerHealth(err.message);
    }
  };

  useEffect(() => {
    checkServerHealth();
    const interval = setInterval(checkServerHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-4 flex flex-col items-center justify-center gap-2">
      <motion.div
        key={responseColor}
        className="w-10 h-1 rounded-full"
        style={{ backgroundColor: responseColor }}
        initial={{ scaleX: 0.6 }}
        animate={{ scaleX: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      />

      <Text size="xs" fw={100} c={isError ? "red" : "dimmed"}>
        {serverHealth}
      </Text>
    </div>
  );
};

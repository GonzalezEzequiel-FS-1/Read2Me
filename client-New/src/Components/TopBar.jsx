import { ActionIcon, Text } from "@mantine/core";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContext } from "../context/NavigationContext";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useHeadroom } from "@mantine/hooks";
import avatar from "/avatar.png";
import ThemeSwapper from "./ThemeSwapper";

export const TopBar = () => {
  const { userName } = useContext(AuthContext);
  const { pageTitle } = useContext(NavigationContext);

  const pinned = useHeadroom({ fixedAt: 0 });

  const handleAssignUser = () => {
    console.log(userName);
  };

  return (
    <motion.div
      animate={{
        y: pinned ? 0 : -100,
        opacity: pinned ? 1 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full fixed top-0 left-0 z-50"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between py-1 ">
        <Text fw="bolder" size="2rem" className="truncate">
          {pageTitle}
        </Text>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeSwapper />

          <motion.div
            whileHover={{
              scale: 1.05,
              y: -3,
              transition: { duration: 0.2, ease: [0.17, 0.67, 0.83, 0.67] },
            }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            <ActionIcon
              variant="transparent"
              size="3rem"
              onClick={handleAssignUser}
            >
              {avatar ? (
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src={avatar}
                    alt="User Profile"
                  />
                </div>
              ) : (
                <FaUserCircle className="text-3xl" />
              )}
            </ActionIcon>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

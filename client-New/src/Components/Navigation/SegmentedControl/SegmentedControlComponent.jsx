import { SegmentedControl, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoLibrary, IoHome, IoAddCircleOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import classes from "./SegmentedControlComponent.module.css";
import { useNavigate } from "react-router-dom";

export const SegmentedControlComponent = () => {
  const [value, setValue] = useState("home");
  const nav = useNavigate();

  const locations = [
    { label: "Home", value: "home", icon: <IoHome /> },
    { label: "Library", value: "library", icon: <IoLibrary /> },
    { label: "Read", value: "read", icon: <IoAddCircleOutline /> },
    { label: "History", value: "history", icon: <FaHistory /> },
  ];

  const handleValueChange = (newValue) => {
    setValue(newValue);
    console.log("Selected value:", newValue);
  };
  useEffect(() => {
    nav(`/${value}`);
  }, [value]);
  return (
    <SegmentedControl
      value={value}
      data={locations.map((location) => ({
        value: location.value,
        label: (
          <div className="transition-all duration-200 ease-in-out flex flex-col items-center px-0 md:px-5 py-1 justify-center gap-1 text-sm md:text-xl">
            <div className="w-[50px] h-10 flex flex-col items-center justify-around">
              <Text size={"2rem"}>{location.icon}</Text>
            </div>
          </div>
        ),
      }))}
      onChange={handleValueChange}
      transitionDuration={400}
      transitionTimingFunction="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      classNames={{
        root: classes.root,
        control: classes.control,
        indicator: classes.indicator,
      }}
    />
  );
};

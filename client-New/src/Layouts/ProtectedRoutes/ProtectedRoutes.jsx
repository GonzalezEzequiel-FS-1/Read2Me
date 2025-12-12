import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoaderIcon } from "../../Components/LoaderIcon";
import { SegmentedControlComponent } from "../../Components/Navigation/SegmentedControl/SegmentedControlComponent";
import { TopBar } from "../../Components/TopBar";
import { Box } from "@mantine/core";
import { ThemeContext } from "../../context/ThemeContext";

export const ProtectedLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const { colorTheme } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderIcon />
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  const isLight = colorTheme === "light";

  return (
    <Box className="relative h-screen overflow-hidden flex flex-col">
      {/* TopBar (fixed) */}
      <section className="fixed top-0 left-0 w-full z-50">
        <TopBar />
      </section>

      {/* Main scrollable content */}
      <section className="relative overflow-auto flex-1 pt-20 pb-20">
        {/* Top fade overlay */}
        <div
          className={`pointer-events-none fixed top-0 left-0 w-full h-32 z-40 bg-gradient-to-b ${
            isLight
              ? "from-[#F5F1E8] via-[#F5F1E8]/70 to-transparent"
              : "from-[#232422] via-[#232422]/70 to-transparent"
          }`}
        />

        {/* Bottom fade overlay */}
        <div
          className={`pointer-events-none fixed bottom-0 left-0 w-full h-32 z-40 bg-gradient-to-t ${
            isLight
              ? "from-[#F5F1E8] via-[#F5F1E8]/70 to-transparent"
              : "from-[#232422] via-[#232422]/70 to-transparent"
          }`}
        />

        <Outlet />
      </section>

      {/* Bottom nav */}
      <section className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
        <SegmentedControlComponent />
      </section>
    </Box>
  );
};

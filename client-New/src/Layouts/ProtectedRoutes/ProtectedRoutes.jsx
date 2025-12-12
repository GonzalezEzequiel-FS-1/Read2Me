import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoaderIcon } from "../../Components/LoaderIcon";
import { SegmentedControlComponent } from "../../Components/Navigation/SegmentedControl/SegmentedControlComponent";
import { TopBar } from "../../Components/TopBar";
import { Box, Container, Space } from "@mantine/core";
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
    <Container className="h-screen overflow-hidden">
      {/* TopBar (fixed) */}
      <section className="fixed top-0 left-0 w-full z-50">
        <TopBar />
      </section>

      {/* Main scrollable content */}
      <section className="relative flex-1 flex flex-col overflow-hidden mt-14">
        <Space mt={"3.5rem"} />
        {/* Top fade overlay */}
        <div
          className={`pointer-events-none fixed top-0 left-0 w-full h-32 z-40 bg-linear-to-b ${
            isLight
              ? "from-[#bababa]/90 to-transparent"
              : "from-[#100f25]/90 to-transparent"
          }`}
        />

        {/* Bottom fade overlay */}
        <div
          className={`pointer-events-none fixed bottom-0 left-0 w-full h-32 z-40 bg-linear-to-t ${
            isLight
              ? "from-[#bababa]/90 to-transparent"
              : "from-[#100f25]/90 to-transparent"
          }`}
        />

        <Outlet />
      </section>

      {/* Bottom nav */}
      <section className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
        <SegmentedControlComponent />
      </section>
    </Container>
  );
};

import { useEffect, useState, type ReactNode } from "react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { cn } from "~/utils/cn";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);

  const isMobile = useMediaQuery("(max-width: 1320px)");


  useEffect(() => {
    if (isMobile && !expanded) {
      setExpanded(true);
    }
  }, [setExpanded, isMobile, expanded]);

  return (
    <AppShell
      header={{ height: isMobile ? 60 : 0 }}
      navbar={{
        width: expanded ? (!isMobile ? 210 : "100%") : 73,
        breakpoint: 1180,
        collapsed: { mobile: !mobileOpened },
      }}
    >
      {isMobile && (
        <AppShell.Header>
          <div className="flex items-center h-full px-4">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              size="sm"
              className="w-[4%]"
            />
          </div>
        </AppShell.Header>
      )}

      <AppShell.Navbar className={cn("h-full")}>
        asdsad
      </AppShell.Navbar>

      <AppShell.Main>
        <main className={`px-4 transition-all duration-300 min-h-screen`}>
          {children}
        </main>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;

import { type ReactNode } from "react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SideBar from "./SideBar/SideBar";
import { Link } from "@tanstack/react-router";
import LogoWithText2 from "../Logo/LogoWithText2";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 900px)");


  return (
    <AppShell
      header={{ height: isMobile ? 60 : 0 }}
      navbar={{
        width: !isMobile ? 250 : 0,
        breakpoint: 900,
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

            <div className="ml-4">
              <Link to="/balance">
                <LogoWithText2 size={150} />
              </Link>
            </div>

          </div>
        </AppShell.Header>
      )}

      <AppShell.Navbar className="h-full ">
        <SideBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <main className={`px-4`}>
          {children}
        </main>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;

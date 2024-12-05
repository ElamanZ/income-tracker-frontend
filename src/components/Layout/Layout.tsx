import { useEffect, type ReactNode } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SideBar from "./SideBar/SideBar";
import LogoWithText2 from "../Logo/LogoWithText2";
import { cn } from "~/utils/cn";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {

  const [opened, { toggle, close }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!isMobile) {
      close();
    }
  }, [isMobile, close]);

  console.log(opened, 'opened');

  return (

    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 768, collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size="sm" />

          {isMobile && opened && (
            <LogoWithText2 size={150} />
          )}


          <div
            id="header"
            className={cn('flex items-center gap-2',
              { 'hidden': opened, ' visible': !opened }
            )}>
          </div>



        </Group>
      </AppShell.Header>

      <AppShell.Navbar className="h-full ">
        <SideBar close={close} />
      </AppShell.Navbar>

      <AppShell.Main>
        <main>
          {children}
        </main>
      </AppShell.Main>
    </AppShell >
  );
};

export default Layout;

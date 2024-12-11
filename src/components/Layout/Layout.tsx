import { useEffect, type ReactNode } from "react";
import { AppShell, Burger, Button, Group, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SideBar from "./SideBar/SideBar";
import { useGetMe } from "~/services/getMe";
import { Link } from "@tanstack/react-router";
import { IconSettings } from "@tabler/icons-react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {

  const [opened, { toggle, close }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [me] = useGetMe()

  useEffect(() => {
    if (!isMobile) {
      close();
    }
  }, [isMobile, close]);

  console.log(opened, 'opened');

  return (

    <AppShell
      className="bg-custom-gradient"
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 768, collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className="bg-custom-bg-dark">
        <Group h="100%" px="md" className="w-full justify-between">

          <Group className="flex items-center gap-3">
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size="sm" color="white" />
            {opened && (
              <div>
                <Text>{me?.profile.firstName} {me?.profile.lastName}</Text>
                <Text>{me?.profile.phone} </Text>
              </div>
            )}
          </Group>

          {!opened && (
            <div id="title"></div>
          )}

          <Link to="/settings">
            <Button
              variant="white"
              className="p-0"
              w={40}
              h={40}
              radius={100}
              onClick={close}
            >
              <IconSettings size={30} strokeWidth={2} color="#130919" />
            </Button>
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className="h-full bg-custom-gradient">
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

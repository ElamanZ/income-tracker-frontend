import { Avatar, Button, Text } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { useLogout } from "~/services/logout"
import { navbarItems } from "../navbarItems"
import SideBarItem from "./SideBarItem"
import { useMediaQuery } from "@mantine/hooks"
import { useGetMe } from "~/services/getMe"
import { cn } from "~/utils/cn"

type Props = {
    close: () => void
}

const SideBar = ({ close }: Props) => {

    const [logout] = useLogout();
    const [me] = useGetMe()


    const isMobile = useMediaQuery("(max-width: 767px)");


    return (
        <div className={cn("p-4 h-screen flex flex-col", { 'h-[calc(100vh-50px)]': isMobile })}>

            {!isMobile ? (
                <div className="flex flex-col justify-between h-screen">

                    <div>
                        {navbarItems.map((item) => (
                            <SideBarItem
                                key={item.id}
                                navBarItem={item}
                                close={close}
                            />
                        ))}
                    </div>

                    <div className="flex items-center border-y-2 border-gray-200 py-2 text-[#62B440]">
                        <Avatar color="#62B440" w={50} h={50} src={me?.profile.avatarUrl} alt={me?.profile.avatarUrl ?? 'avatar'} />

                        <div className="ml-4">
                            <Text className="font-semibold">{me?.profile.firstName} {me?.profile.lastName}</Text>
                            <Text>{me?.profile.phone}</Text>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="flex justify-center h-screen items-center">
                    <div className="grid grid-cols-2 gap-4 h-52">
                        {navbarItems.map((item) => (
                            <SideBarItem
                                key={item.id}
                                navBarItem={item}
                                close={close}
                            />
                        ))}
                    </div>
                </div>
            )}



            <div className="my-5 flex justify-end">
                <Button
                    rightSection={<IconLogout size={22} color="#0F0F31" />}
                    variant="white"
                    color="#0F0F31"
                    radius="md"
                    fullWidth
                    size="md"
                    onClick={logout}
                >
                    Выйти
                </Button>
            </div>


        </div>
    )
}

export default SideBar
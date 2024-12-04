import { Avatar, Button, Text } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import LogoWithText2 from "~/components/Logo/LogoWithText2"
import { useLogout } from "~/services/logout"
import { navbarItems } from "../navbarItems"
import SideBarItem from "./SideBarItem"
import { useMediaQuery } from "@mantine/hooks"
import { useGetMe } from "~/services/getMe"
import { cn } from "~/utils/cn"

const SideBar = () => {

    const [logout] = useLogout();
    const [me] = useGetMe()


    const isMobile = useMediaQuery("(max-width: 900px)");


    return (
        <div className={cn("p-4 bg-white rounded-3xl h-screen flex flex-col justify-between", { 'h-[calc(100vh-50px)]': isMobile })}>

            <div className="flex flex-col justify-between h-screen">

                <div>
                    {!isMobile && (
                        <div>
                            <Link to="/balance">
                                <LogoWithText2 size={180} />
                            </Link>
                        </div>
                    )}


                    <div className={cn("mt-10", { 'mt-0': isMobile })}>
                        {navbarItems.map((item) => (
                            <SideBarItem
                                key={item.id}
                                navBarItem={item}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center border-y-2 border-gray-200 py-2 text-[#62B440]">
                    <Avatar color="#62B440" w={50} h={50} src={me?.profile.avatarUrl} alt={me?.profile.avatarUrl ?? 'avatar'} />

                    <div className="ml-4">
                        <Text className="font-semibold">{me?.profile.firstName} {me?.profile.lastName}</Text>
                        <Text>{me?.profile.phone}</Text>
                    </div>
                </div>
            </div>


            <div className="my-5">
                <Button
                    rightSection={<IconLogout size={16} color="red" />}
                    variant="outline"
                    color="red"
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
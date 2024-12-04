import { Link } from "@tanstack/react-router"
import { NavbarItem } from "../navbarItems"
import { cn } from "~/utils/cn"
import { Text } from "@mantine/core"


type Props = {
    navBarItem: NavbarItem
}


const SideBarItem = ({ navBarItem }: Props) => {
    return (
        <Link
            activeProps={{
                className: 'relative flex items-center rounded-md p-2 text-xl cursor-pointer bg-[#E2EED8] text-[#62B440]'
            }}
            inactiveProps={{
                className: 'relative flex items-center rounded-md p-2 text-xl cursor-pointer hover:text-[#62B440]',
            }}
            search={navBarItem.search}
            params={navBarItem.params}
            to={navBarItem.path}
        >
            <div className={cn('p-1 rounded-md')}>
                {navBarItem.icon}
            </div>
            <Text size='md' className='ml-3 group-[.is-collapsed]:w-0 group-[.is-collapsed]:ml-0 whitespace-nowrap flex overflow-hidden'>
                {navBarItem.title}
            </Text>
        </Link>
    )
}

export default SideBarItem
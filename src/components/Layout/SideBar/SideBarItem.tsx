import { Link } from "@tanstack/react-router"
import { NavbarItem } from "../navbarItems"
import { cn } from "~/utils/cn"
import { Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"


type Props = {
    navBarItem: NavbarItem
    close: () => void
}

const SideBarItem = ({ navBarItem, close }: Props) => {

    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <>
            {isMobile ? (
                <Link
                    onClick={close}
                    activeProps={{
                        className: 'relative bg-[#00000066] flex flex-col justify-center items-center rounded-xl p-2 text-xl cursor-pointer border border-white '
                    }
                    }
                    inactiveProps={{
                        className: 'relative bg-[#00000066] flex flex-col justify-center items-center rounded-xl p-2 text-xl cursor-pointer',
                    }}
                    search={navBarItem.search}
                    params={navBarItem.params}
                    to={navBarItem.path}
                >
                    <div className={cn('p-1 rounded-md mb-1')}>
                        {navBarItem.icon}
                    </div>
                    <Text>
                        {navBarItem.title}
                    </Text>
                </Link >
            ) : (
                < Link
                    onClick={close}
                    activeProps={{
                        className: 'relative flex items-center rounded-md p-2 text-xl cursor-pointer text-[#62B440]'
                    }
                    }
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
                </ Link>
            )}
        </>

    )
}

export default SideBarItem
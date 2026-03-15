import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router"

export const CustomMenu = () => {

  const { pathname } = useLocation();
  const isActive = (path: string) => {
    return pathname === path;
  }


  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={ cn(isActive('/') && "bg-slate-300", "p-2 rounded-md")}
          >
            <Link to="/" > Home </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={ cn(isActive('/search') && "bg-slate-300", "p-2 rounded-md")}
          >
            <Link to="/search" > Search Superheroes </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

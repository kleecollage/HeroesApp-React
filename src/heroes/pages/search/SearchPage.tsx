import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { HeroStats } from "@/heroes/components/HeroStats"
import { useSearchHeroes } from "@/heroes/hooks/useSearchHeroes"
import { SearchControls } from "@/heroes/pages/search/ui/SearchControls"
import { useSearchParams } from "react-router"

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const team = searchParams.get('team') ?? '';
  const category = searchParams.get('category') ?? '';
  const universe = searchParams.get('universe') ?? '';
  const status  = searchParams.get('status') ?? '';
  const strength = searchParams.get('strength') ?? '';

  const { data: heroes = [] } = useSearchHeroes({name, team, category, universe, status, strength} )

  return (
    <>
      {/* Header */}
      <CustomJumbotron title="Superheroes Search" description='Discover, explore and manage superheroes and villians' />

      {/* Breadcums */}
      <CustomBreadcrums />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      {/*  */}
      <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage
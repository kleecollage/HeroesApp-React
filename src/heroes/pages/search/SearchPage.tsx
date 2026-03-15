import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "@/heroes/pages/search/ui/SearchControls"

export const SearchPage = () => {
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
    </>
  )
}

export default SearchPage
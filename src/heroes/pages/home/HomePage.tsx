import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { HeroStats } from "@/heroes/components/HeroStats"
import { Heart } from "lucide-react"
import { useState } from "react"

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState< "all" | "favorites" | "heroes" | "villains" >('all')

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title={'Superheroes Universe'} description={'Discover, explore and manage superheroes and villians'} />

        {/* Breadcums */}
        <CustomBreadcrums />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">

          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={ () => setActiveTab('all')} >
              All Characters (16)
            </TabsTrigger>

            <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={ () => setActiveTab('favorites')} >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>

            <TabsTrigger value="heroes" onClick={ () => setActiveTab('heroes')} >
              Heroes (12)
            </TabsTrigger>

            <TabsTrigger value="villains" onClick={ () => setActiveTab('villains')} >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Show all characters */}
            <HeroGrid />
          </TabsContent>

          <TabsContent value="favorites">
            {/* Show favorites characters */}
            <HeroGrid />
          </TabsContent>

          <TabsContent value="heroes">
            {/* Show all herores */}
            <HeroGrid />
          </TabsContent>
          <TabsContent value="villains">
            {/* Show all villains */}
            <HeroGrid />
          </TabsContent>

        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8} />

        {/* No Results */}
        {/* {filteredHeroes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No heroes found</h3>
            <p className="text-gray-600">Try adjusting your search terms or add a new hero to the database.</p>
          </div>
        )} */}
      </>
    </>
  )
}

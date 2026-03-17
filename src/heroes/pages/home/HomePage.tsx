import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { HeroStats } from "@/heroes/components/HeroStats"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { Heart, Search } from "lucide-react"
import { use, useMemo } from "react"
import { useSearchParams } from "react-router"

export const HomePage = () => {
  // const [activeTab, setActiveTab] = useState<"all" | "favorites" | "heroes" | "villains">('all')
  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, [])

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab]);

  // const { data: heroesResponse } = useQuery({
  //   queryKey: ['heroes', { page, limit}],
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5 // 5 mins
  // });

  // const { data: summary } = useQuery({
  //   queryKey: ['summary-information'],
  //   queryFn: getSumamryAction,
  //   staleTime: 1000 * 60 * 5, // 5 mins
  // });

  const {data: heroesResponse} = usePaginatedHero({page: +page, limit: +limit, category}); // custom hook

  const { data: summary } = useHeroSummary(); // customHook

  const { favoriteCount, favorites } = use(FavoriteHeroContext);

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
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={ () => setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              }
            )} >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={ () => setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                }
              )} >
                <Heart className="h-4 w-4" />
                Favorites ({favoriteCount})
            </TabsTrigger>

            <TabsTrigger
              value="heroes"
              onClick={ () => setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;
                }
              )} >
                Heroes ({summary?.heroCount})
            </TabsTrigger>

            <TabsTrigger
              value="villains"
              onClick={ () => setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                }
              )} >
                Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Show all characters */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites">
            {/* Show favorites characters */}
            <HeroGrid heroes={favorites} />
          </TabsContent>

          <TabsContent value="heroes">
            {/* Show all herores */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Show all villains */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

        </Tabs>

        {/* Pagination */}
        { selectedTab !== 'favorites' && <CustomPagination totalPages={heroesResponse?.pages ?? 1} /> }


        {/* No Results */}
        {heroesResponse?.heroes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No heroes found</h3>
            <p className="text-gray-600">Try adjusting your search terms or add a new hero to the database.</p>
          </div>
        )}
      </>
    </>
  )
}

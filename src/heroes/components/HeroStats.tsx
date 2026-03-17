import { Badge } from "@/components/ui/badge"
import { HeroStatCard } from "@/heroes/components/HeroStatCard"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { use } from "react"

export const HeroStats = () => {
  // const { data: summary } = useQuery({
  //   queryKey: ['summary-information'],
  //   queryFn: getSumamryAction,
  //   staleTime: 1000 * 60 * 5, // 5 mins
  // });

  const { data: summary } = useHeroSummary(); // customHook
  const { favoriteCount } = use(FavoriteHeroContext);
  if(!summary) return <div>Loading...</div>

  // const percentageFavorite = useMemo(() => {
  //   const percentage = (favoriteCount / summary.totalHeroes).toFixed(2)
  // }, [favoriteCount, summary]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard title='Total Characters' icon={<Users className="h-4 w-4 text-muted-foreground" />} >
        <div className="text-2xl font-bold">{summary.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary.villainCount} Villains
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard title='Favorites' icon={<Heart className="h-4 w-4 text-muted-foreground" />} >
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">{((favoriteCount / summary.totalHeroes)*100).toFixed(1)}% of total</p>
      </HeroStatCard>

      <HeroStatCard title='Strongest' icon={<Zap className="h-4 w-4 text-muted-foreground" />} >
        <div className="text-lg font-bold">{summary.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Strength: {summary.strongestHero.strength}/10</p>
      </HeroStatCard>

      <HeroStatCard title='Smartest' icon={<Trophy className="h-4 w-4 text-muted-foreground" />} >
        <div className="text-lg font-bold">{summary.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Intelligence: {summary.smartestHero.intelligence}/10</p>
      </HeroStatCard>
    </div>
  )
}

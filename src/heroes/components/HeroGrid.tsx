import { HeroGridCard } from "@/heroes/components/HeroGridCard"

export const HeroGrid = () => {
  return (
    <>
      <HeroGridCard
        universe='DC'
        team='Justice League'
        type='Hero'
        alias='Superman'
        name='Clark Kent'
        powers={["Super Strength", "Flight", "Heat Vision", "X-Ray Vision"]}
        description='The Last Son of Krypton, protector of Earth and symbol of hope.'
        strength={100}
        intelligence={90}
        speed={80}
        durability={50}
        appeared='First appeared in 1956' />
    </>
  )
}

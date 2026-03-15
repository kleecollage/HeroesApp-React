import { appRouter } from "@/router/app.router"
import { RouterProvider } from "react-router"

export const HeroesApp = () => {
  return (
    <>
      <RouterProvider router={ appRouter } />
    </>
  )
}

import { Suspense } from "react"
import { RouterProvider } from 'react-router-dom'
import router from "./common/domain/routes"
import KeycloakProvider from "./common/providers/Keycloak.provider"
import StoreProvider from "./common/providers/Store.provider"
import ThemeProvider from "./common/providers/Theme.provider"
import FallbackLoader from "@Atom/Loader/FallbackLoader"

const App = () => {
  return (
    <KeycloakProvider>
      <ThemeProvider>
        <StoreProvider>
          <Suspense fallback={<FallbackLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </StoreProvider>
      </ThemeProvider>
    </KeycloakProvider>
  )
}

export default App
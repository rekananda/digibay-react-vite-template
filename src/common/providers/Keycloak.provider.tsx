import { createReactOidc } from "oidc-spa/react";

export const {
  OidcProvider: KeycloakProvider,
  /**
   * Note: If you have multiple OidcProvider in your app
   * you do not need to use the useClient hook that that corresponds
   * to the above OidcProvider.
   */
  useOidc,
  /**
   * This is useful to use the oidc API outside of React.
   */
  getOidc,
} = createReactOidc({
  issuerUri: import.meta.env.VITE_AUTH_SERVER_URI,
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  publicUrl: import.meta.env.VITE_PUBLIC_URL,
});

export default KeycloakProvider

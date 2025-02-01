import { getOidc } from "@/common/providers/Keycloak.provider";

export async function getAccessToken() {
  const oidc = await getOidc();
  const user: { access_token: string } = JSON.parse(
    sessionStorage.getItem(
      `oidc.user:${oidc.params.issuerUri}:${oidc.params.clientId}`
    ) || ''
  );

  return user.access_token;
}

export async function getTenant() {
  const oidc = await getOidc();
  const user: { profile: {
    iss: string;
    realm: string;
  } } = JSON.parse(
    sessionStorage.getItem(
      `oidc.user:${oidc.params.issuerUri}:${oidc.params.clientId}`
    ) || ''
  );

  return user.profile.realm;
}
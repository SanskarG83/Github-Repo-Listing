import { environment_local } from "./environment.local";

export const environment = {
    production: true,
    clientId: environment_local.clientId,
    clientSecret: environment_local.clientSecret,
};

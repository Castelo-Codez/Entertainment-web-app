import {NuxtAuthHandler} from "#auth";
import GithubProvider from "next-auth/providers/github";
export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: process.env.AUTH_SEC,
    pages: {
        signIn: "/signIn",
        error: "/signIn",
    },
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        GithubProvider.default({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SEC,
        }),
    ],
});

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../src/db/index"; // your drizzle instance
import * as schema from "../src/db/auth-schema"


export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", schema, // or "mysql", "sqlite"
    }),
});
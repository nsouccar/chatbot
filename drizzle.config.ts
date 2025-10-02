import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
require('dotenv').config({ path: './.env' })
console.log("URL ", process.env.DATABASE_URL!)

export default defineConfig({
    out: './drizzle',
    schema: ['./src/db/auth-schema.ts', './src/db/messages-schema.ts'],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    schemaFilter: ["public"],
});



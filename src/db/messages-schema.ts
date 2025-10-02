import { integer, uuid, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: varchar(),
    message: varchar(),
    bot: varchar()






})

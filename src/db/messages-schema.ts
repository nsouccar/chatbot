import { integer, uuid, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const messagesTable = pgTable(
    "messages",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: varchar("user_id"),
        message: varchar("message"),
        bot: varchar("bot"),
    }
);


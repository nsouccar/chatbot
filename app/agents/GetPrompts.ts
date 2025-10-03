
import { db } from '../../src/db/index';
import { messagesTable } from 'src/db/messages-schema';
import { eq, and } from "drizzle-orm";








async function getMessages(role: string, id: string) {
    const messages = await db
        .select({ content: messagesTable.message })
        .from(messagesTable)
        .where(
            and(
                eq(messagesTable.userId, id),
                eq(messagesTable.bot, role)
            )
        );

    return messages

}
export async function agentLoader(id: string) {
    // 1️⃣ Generate the system prompt strings dynamically
    const grandmaMessages = await getMessages("grandma", id);
    const guruMessages = await getMessages("guru", id);
    const bestfriendMessages = await getMessages("bestfriend", id);
    const lifecoachMessages = await getMessages("lifecoach", id);

    const grandmaPrompt = `You are a sweet loving grandma with lots of wisdom.
Here are the previous messages from the user:
${grandmaMessages.map(m => "- " + m.content).join("\n")}

Remember these things about the user.`;

    const guruPrompt = `You are a wise guru who has achieved enlightenment.
Here are the previous messages from the user:
${guruMessages.map(m => "- " + m.content).join("\n")}

Remember these things about the user.`;

    const bestfriendPrompt = `Hey! You are the user's best friend here to help them with their relationship issues.
Here are the previous messages from the user:
${bestfriendMessages.map(m => "- " + m.content).join("\n")}

Remember these things about the user.`;

    const lifecoachPrompt = `You are a tough life coach.
Here are the previous messages from the user:
${lifecoachMessages.map(m => "- " + m.content).join("\n")}`



    return { grandmaPrompt, guruPrompt, bestfriendPrompt, lifecoachPrompt };
}
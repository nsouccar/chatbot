import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { useParams, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';
import { bestfriend, guru, grandma, lifecoach } from '@/agents/agents';
import { messagesTable } from '../../src/db/messages-schema';
import { db } from '../../src/db/index';
import { auth } from "lib/auth";
import { session } from 'src/db/auth-schema';
import { eq } from 'drizzle-orm';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function getUserFromSessionToken(sessionToken: string) {
    // 1️⃣ Look up the session row


    const sessions = await db
        .select()
        .from(session)
        .where(eq(session.token, sessionToken))

    console.log("BLAHBLAH", sessions)
    console.log("BROKEN",)

    if (!sessions.length) return null; // invalid or expired token

    const userId = sessions[0].userId;

    return userId


}





export async function action({ request, params }: ActionFunctionArgs) {
    const cookie = request.headers.get("Cookie")!; // get cookie header
    console.log("REQUEST", request)
    const result = await auth.handler(request);
    console.log("RERERE", result)

    console.log("COOKIE", cookie)
    const token = cookie
        .split(";")            // split multiple cookies
        .map(c => c.trim())    // remove whitespace
        .find(c => c.startsWith("better-auth.session_token="))
        ?.split("=")[1];       // get the value after =

    // decode URI component (Better Auth encodes the token)


    const { messages }: { messages: UIMessage[] } = await request.json();
    const decoded = decodeURI(token!)
    console.log("DECODED", decoded)
    const id = await getUserFromSessionToken(decoded)
    console.log(id)


    let agent = guru


    if (params.role === "bestfriend") {
        agent = bestfriend

    } else if (params.role === "grandma") {
        agent = grandma


    } else if (params.role === "lifecoach") {
        agent = lifecoach
    }

    await db.insert(messagesTable).values(

        {

            userId: id!,
            message: "hellp",
            bot: agent
        })






    const stream = agent.stream({

        messages: convertToModelMessages(messages)
    });

    return stream.toUIMessageStreamResponse();
}
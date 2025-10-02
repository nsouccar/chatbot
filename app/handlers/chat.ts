import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { useParams, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';
import { bestfriend, guru, grandma, lifecoach } from '@/agents/agents';
import { messagesTable } from '../../src/db/messages-schema';
import { db } from '../../src/db/index';
import { auth } from "lib/auth";




// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function action({ request, params }: ActionFunctionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json();
    // Get the full text of the first message
    const firstMessage = messages[messages.length - 1];
    const textParts = firstMessage.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map(p => p.text);

    const fullText = textParts.join('');



    const stuff = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: request.headers, // pass the headers
    });





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

            userId: stuff!.user!.id!,
            message: fullText,
            bot: params.role
        })






    const stream = agent.stream({

        messages: convertToModelMessages(messages)
    });

    return stream.toUIMessageStreamResponse();
}
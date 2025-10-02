import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { useParams, type ActionFunctionArgs } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';
import { bestfriend, guru, grandma, lifecoach } from '@/agents/agents';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function action({ request, params }: ActionFunctionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json();
    let agent = guru


    if (params.role === "bestfriend") {
        agent = bestfriend

    } else if (params.role === "grandma") {
        agent = grandma


    } else if (params.role === "lifecoach") {
        agent = lifecoach
    }




    const stream = agent.stream({

        messages: convertToModelMessages(messages)
    });

    return stream.toUIMessageStreamResponse();
}
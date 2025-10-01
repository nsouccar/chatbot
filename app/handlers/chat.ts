import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import type { ActionFunctionArgs } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function action({ request }: ActionFunctionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: anthropic('claude-opus-4-20250514'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
import { convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { type ActionFunctionArgs } from 'react-router';
import { anthropic } from '@ai-sdk/anthropic';
import { messagesTable } from '../../src/db/messages-schema';
import { db } from '../../src/db/index';
import { auth } from "lib/auth";

import { Experimental_Agent as Agent } from "ai";
import { store } from "@/agents/agentPrompts"
import { elevenlabs } from '@ai-sdk/elevenlabs';
import { experimental_generateSpeech as generateSpeech } from 'ai';
import dotenv from "dotenv";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { Speaker } from '@elevenlabs/elevenlabs-js/api/resources/dubbing/resources/resource/resources/speaker/client/Client';


dotenv.config({ path: "../.env.local" });




// Allow streaming responses up to 30 seconds
export const maxDuration = 5;



export async function action({ request, params }: ActionFunctionArgs) {





    const { messages }: { messages: UIMessage[] } = await request.json();
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







    let agent = new Agent({
        model: anthropic('claude-opus-4-20250514'),
        system: store.guru,
        temperature: 0.8






    })


    if (params.role === "bestfriend") {
        agent = new Agent({
            model: anthropic('claude-opus-4-20250514'),
            system: store.bestfriend,
            temperature: 0.8






        })


    } else if (params.role === "grandma") {
        agent = new Agent({
            model: anthropic('claude-opus-4-20250514'),
            system: store.grandma,
            temperature: 0.8
        })


    } else if (params.role === "lifecoach") {
        agent = new Agent({
            model: anthropic('claude-opus-4-20250514'),
            system: store.lifecoach,
            temperature: 0.8,







        })
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

    const textStream = stream.textStream;






    return stream.toUIMessageStreamResponse();


}





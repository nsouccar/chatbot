
export async function loader({ request, params }) {
    // Only server-side code here
    const { auth } = await import("lib/auth.server");
    const { agentLoader } = await import("./GetPrompts.server");
    const { store } = await import("./agentPrompts.server");

    const session = await auth.api.getSession({ headers: request.headers });
    const id = session!.user.id;

    const agents = await agentLoader(id);

    // Update your store safely on server
    store.grandma = agents.grandmaPrompt;
    store.bestfriend = agents.bestfriendPrompt;
    store.lifecoach = agents.lifecoachPrompt;
    store.guru = agents.guruPrompt;

}
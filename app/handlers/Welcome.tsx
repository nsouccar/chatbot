
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router"
import { auth } from "lib/auth";
import { useState } from "react"
import { Link } from "react-router"
import { type ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { Form } from "react-router"


export async function loader({ request, params }: LoaderFunctionArgs) {
    console.log("HELLO")
    console.log("HEADERS", Object.fromEntries(request.headers));


    const session = await auth.api.getSession({ headers: request.headers })

    console.log("SESSION", session);


    return { user: session?.user }
}



export async function action({ request }: ActionFunctionArgs) {
    console.log("hello")
    await auth.api.signOut({ headers: request.headers });
    return redirect("/login")
}

export default function Welcome() {
    const userData = useLoaderData()
    console.log("DATA ", userData)




    return (
        <>
            <div>Hello, {(userData.user.name)}</div>
            <Link to="/chatui">Chat</Link>
            <Form method="post">
                <button>Sign out</button>
            </Form>

        </>
    )
}
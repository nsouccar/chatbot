
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router"
import { auth } from "lib/auth";
import { useState } from "react"



export async function loader({ request, params }: LoaderFunctionArgs) {
    console.log("HELLO")
    console.log("HEADERS", Object.fromEntries(request.headers));

    const session = await auth.api.getSession({ headers: request.headers })

    console.log("SESSION", session);


    return { user: session?.user }
}


export default function Welcome() {
    const userData = useLoaderData()
    console.log("DATA ", userData)




    return (
        <div>Hello, {(userData.user.name)}</div>
    )
}
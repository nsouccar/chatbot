
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router"
import { auth } from "lib/auth";
import { Link } from "react-router"
import { type ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { Form } from "react-router"



export async function loader({ request, params }: LoaderFunctionArgs) {




    const session = await auth.api.getSession({ headers: request.headers })



    const id = session!.user.id




    return { user: session?.user }
}



export async function action({ request }: ActionFunctionArgs) {
    await auth.api.signOut({ headers: request.headers });
    return redirect("/")
}

export default function Welcome() {
    const userData = useLoaderData()




    return (
        <>
            <div>Hello, {(userData.user.name)}</div>
            <Link to="/chatui/bestfriend">Bestfriend</Link>
            <Link to="/chatui/guru">Guru</Link>
            <Link to="/chatui/grandma">Grandma </Link>
            <Link to="/chatui/lifecoach">Life Coach</Link>


            <Form method="post">
                <button>Sign out</button>
            </Form>

        </>
    )
}

import { type LoaderFunctionArgs, useActionData } from "react-router";
import { useLoaderData } from "react-router"
import { auth } from "lib/auth.server";
import { Link } from "react-router"
import { type ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { Form } from "react-router"
import { motion } from "motion/react"




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
    const actionData = useActionData() as { error?: string }





    return (




        <div className="flex flex-col  font-gossip h-screen bg-black">
            <div className="flex flex-row items-center">
                <div className="relative font-gossip font-size: text-4xl text-center text-white p-5">lovebot
                    <img src="/images/lips.svg" className="absolute w-10 h-10 bottom-2 -right-5 rotate-25"></img>
                </div>
                <div className="relative font-gossip  text-center text-white p-5">insights</div>
                <Link to="/" className="relative font-gossip  text-center text-white p-5">back</Link>
            </div>
            <div className="flex flex-col items-center">
                <motion.div

                    initial={{ opacity: 0, }} // Starts invisible and off-screen to the left
                    animate={{ opacity: 1 }}
                    transition={{ duration: 5 }}    // Animates to fully visible and in its original position
                >
                    <div className="text-white shadow-accent-foreground text-7xl m-10">Hello, {(userData.user.name)}</div>
                </motion.div>
                <motion.div

                    initial={{ opacity: 0, }} // Starts invisible and off-screen to the left
                    animate={{ opacity: 1 }}
                    transition={{ duration: 10 }}    // Animates to fully visible and in its original position
                >
                    <div className="text-white shadow-accent-foreground text-3xl m-10">You don't have to be alone. Who would you like to speak to today?</div>

                </motion.div>
                <div className="flex gap-x-5">
                    <Link className="font-gossip text-pink-400" to="/chatui/bestfriend">BestfriendBot</Link>
                    <Link className="font-gossip text-pink-400" to="/chatui/guru">GuruBot</Link>
                    <Link className="font-gossip text-pink-400" to="/chatui/grandma">PsychicGrandmaBot</Link>
                    <Link className="font-gossip text-pink-400" to="/chatui/lifecoach">ToughLoveLifeCoach</Link>
                </div>
            </div>





            <Form method="post">
                <button>Sign out</button>
            </Form>
        </div>


    )
}
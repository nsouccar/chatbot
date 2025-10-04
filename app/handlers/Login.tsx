
import { Form, redirect } from "react-router"
import { type ActionFunctionArgs, Link, useActionData } from "react-router";

import { auth } from "lib/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"



export async function action({ request }: ActionFunctionArgs) {
    console.log("HIHIHIHI")
    const formData = await request.formData()
    const response = await auth.api.signInEmail({
        asResponse: true,
        body: {

            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

    })

    if (!response.ok) {
        const errorBody = await response.json()

        return { error: errorBody.message }
    } else {


        return redirect("/welcome", { headers: response.headers })

    }

}

function Login() {
    const actionData = useActionData() as { error?: string }


    return (

        <div className="fixed min-h-screen w-screen bg-[url('/images/city3.jpg')] bg-center bg-cover bg-no-repeat m-0 p-1">


            <div className="h-screen flex flex-col items-center mt-30">
                <motion.div

                    initial={{ opacity: 0 }} // Starts invisible and off-screen to the left
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}    // Animates to fully visible and in its original position
                >
                    <div className="relative font-gossip font-size: text-9xl text-center text-white ">lovebot
                        <img src="/images/lips.svg" className="absolute w-30 h-30 -bottom-10 -right-5 rotate-25"></img>
                    </div>

                </motion.div>

                <motion.div

                    initial={{ opacity: 0, y: 100 }} // Starts invisible and off-screen to the left
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}    // Animates to fully visible and in its original position
                >

                    <Form method="post">
                        <Card className="mx-auto max-w-sm">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                                <CardDescription>Enter your email and password to login to your account</CardDescription>
                            </CardHeader>
                            <CardContent>

                                <div className="space-y-4">

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" placeholder="m@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" name="password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                    <div className="flex justify-center gap-x-1">
                                        <Label>Don't have an account?</Label><Link to="/signup" className="hover: text-pink-500">Signup</Link>

                                    </div>
                                </div>

                                <div className="w-full flex justify-center ">
                                    {actionData?.error && (
                                        <p className="text-red-400 ">{actionData.error}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                    </Form>

                </motion.div>
            </div>
        </div >


    )
}

export default Login

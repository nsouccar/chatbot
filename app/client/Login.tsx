
import { Form, redirect } from "react-router"
import type { ActionFunctionArgs } from "react-router";
import { auth } from "lib/auth";


export async function action({ request }: ActionFunctionArgs) {
    console.log("ABOUT TO LOIGIN")
    const formData = await request.formData()
    const response = await auth.api.signInEmail({
        asResponse: true,
        body: {

            email: formData.get("email") as string,
            password: formData.get("password") as string
        }




    })

    const cookie = response.headers.get("set-cookie")

    //console.log("COOKIE", cookie)
    return redirect("/welcome")







}



function Login() {

    return (
        <>

            <Form method="post">

                <label>
                    Email:
                    <input type="email" name="email" />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" />
                </label>

                <button type="submit">Submit</button>
            </Form>
        </>
    )
}

export default Login

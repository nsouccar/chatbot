
import { Form } from "react-router"
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { auth } from "lib/auth";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");   // comes from <input name="name" />
    const email = formData.get("email");
    const password = formData.get("password");

    //console.log("Signing up:", { name, email, password });

    const response = await auth.api.signUpEmail({
        asResponse: true,

        body: {
            name: name! as string,
            email: email as string,
            password: password as string

        }




    })

    return new Response(null, {
        status: 302,
        headers: {
            "Location": "/welcome",
            "Set-Cookie": response.headers.get("set-cookie")!
        }
    });





}


function Signup() {

    return (
        <>
            <Form method="post">
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>

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

export default Signup


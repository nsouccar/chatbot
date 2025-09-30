
import { Form } from "react-router"
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { auth } from "lib/auth";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");   // comes from <input name="name" />
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Signing up:", { name, email, password });

    await auth.api.signUpEmail({
        body: {
            name: name! as string,
            email: email as string,
            password: password as string

        }
    })





    // comes from <input name="email" />

    // Do something with these values, e.g. save to DB or call API

    //  return redirect("/contacts"); // navigate after success
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


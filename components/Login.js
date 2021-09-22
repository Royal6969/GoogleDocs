import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from 'next-auth/client'; // npm install --save next-auth

function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Image
                src="https://links.papareact.com/1ui"
                height="300"
                width="550"
                objectFit="contain"
            />
            <Button 
                className="w-44 mt-10"
                color="blue"
                buttonType="filled"
                ripple="light"
                onClick={signIn}
            >
                Login
            </Button>
        </div>
    ); // in GoogleCloudPlatform go to credentials, click on new, and select ClientID auth, edit your default clientID, and paste de url that google gave you throught the api in localhost in redirect URLs authorized and http://localhost:3000 in authorized URLs above ...
}

export default Login;
import { useLoginModel } from "@/viewModels/Login/login.model";
import { LoginView } from "@/viewModels/Login/login.view";

export default function Login() {
    const loginModel = useLoginModel();

    return <LoginView {...loginModel} />;
}
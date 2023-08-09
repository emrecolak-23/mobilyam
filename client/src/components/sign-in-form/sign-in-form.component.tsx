import { SignInContainer } from "./sign-in-form.styles";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/slices/auth-slice";

const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch<any>(signIn(formFields))
        setFormFields(defaultFormFields)
        navigate('/')
    }

    return <SignInContainer>
        <h2>Hesabınıza</h2>
        <span>Email ve Password ile giriş yapın</span>
        <form onSubmit={handleSubmit}>
        <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
        />
         <FormInput
            label="Şifre"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
        />
        <Button type="submit">Giriş Yap</Button>
        </form>

    </SignInContainer>
}

export default SignInForm
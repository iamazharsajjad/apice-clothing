import { confirmPasswordReset } from 'firebase/auth';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/Firebase/FirebaseUtils';
import FormInput from '../FormInput/FormInput';
const defaultFormFeilds = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm =  () =>{
    const [formFeild, setFormFeilds] = useState(defaultFormFeilds);
    const { displayName, email, password, confirmPassword } = formFeild

    console.log(formFeild);

    const resetFormField = () =>{
        setFormFeilds(defaultFormFeilds);
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();

        if (password != confirmPassword){
            alert('password do not match')
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormField();
        }catch(error){
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user. Email already exists')
            }else{
                console.log('User creation encounted an error', error)
            }
        }
    }

    const handleChange = ( event ) =>{
        const { name, value } = event.target;
        setFormFeilds({...formFeild, [name]: value});
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
               
                <FormInput label='Display Name' type="text" required onChange={handleChange} name = 'displayName' value = { displayName }/>

                <FormInput label='Email' type='email' required onChange={handleChange} name = 'email' value = { email }/>

                <FormInput label='Password' type='password' required onChange={handleChange} name = 'password' value = { password } />

                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name = 'confirmPassword' value = { confirmPassword }/>

                <button type="submit"> Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm
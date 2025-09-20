import { confirmPasswordReset } from 'firebase/auth';
import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/Firebase/FirebaseUtils';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import './styles.scss'
import { UserContext } from '../../context/user.context';
const defaultFormFeilds = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm =  () =>{
    const [formFeild, setFormFeilds] = useState(defaultFormFeilds);
    const { displayName, email, password, confirmPassword } = formFeild
    const {setCurrentUser} = useContext(UserContext);

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
            setCurrentUser(user);
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
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label='Display Name' type="text" required onChange={handleChange} name = 'displayName' value = { displayName }/>

                <FormInput label='Email' type='email' required onChange={handleChange} name = 'email' value = { email }/>

                <FormInput label='Password' type='password' required onChange={handleChange} name = 'password' value = { password } />

                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name = 'confirmPassword' value = { confirmPassword }/>

                <Button type="submit"> Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm
import { confirmPasswordReset } from 'firebase/auth';
import { useState, useContext } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/Firebase/FirebaseUtils';
import { UserContext } from '../../context/user.context';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import './styles.scss'
const defaultFormFeilds = {
    email: '',
    password: ''
}

const SignInForm =  () =>{
    const [formFeild, setFormFeilds] = useState(defaultFormFeilds);
    const { email, password } = formFeild;
    const {setCurrentUser} = useContext(UserContext);

    const signInWithGoogle = async() =>{
        const { user } =  await signInWithGooglePopup();
        // console.log(response)
    }

    const resetFormField = () =>{
        setFormFeilds(defaultFormFeilds);
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();

        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            // console.log(response);
            resetFormField();
        }catch(error){
            console.log(error);
            if (error.code == "auth/invalid-credential"){
                alert('Invalid Credentials, try with correct Email and Password.');
            }
            
        }
    }

    const handleChange = ( event ) =>{
        const { name, value } = event.target;
        setFormFeilds({...formFeild, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name = 'email' value = { email }/>
                <FormInput label='Password' type='password' required onChange={handleChange} name = 'password' value = { password } />
                <div className='buttons-container'>
                <Button type="submit"> Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}> Google sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/Firebase/FirebaseUtils'
const SignIn=()=>{
    const logGoogleUser = async() =>{
        const { user } =  await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        // console.log(response)
    }
    return (
        <div>
            <h1>
                <button onClick={ logGoogleUser }>
                    Sign In Page
                </button>
            </h1>
        </div>
    )
}

export default SignIn;

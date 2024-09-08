import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/Firebase/FirebaseUtils'

import SignUpForm from '../../components/SignUpForm/SignUp';
import SignInForm from '../../components/SignInForm/SignInForm';
import './styles.scss'
const Authentication=()=>{

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;

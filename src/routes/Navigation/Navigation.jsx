import { Fragment,useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Crown } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/Firebase/FirebaseUtils'
import './style.scss'
const Navigation = ()=>{
    const { currentUser, setCurrentUser } = useContext( UserContext );
    const signOutHandler =  async() => {
        const res = await signOutUser();
        setCurrentUser(null);
        console.log(res);
    }
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <Crown className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className='nav-link' onClick = {signOutHandler}>SIGN OUT</span>
                    ) : ( <Link className='nav-link' to='/auth'>
                        SIGN IN
                    </Link>)
                }
            </div>        
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation
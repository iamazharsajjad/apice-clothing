import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Crown } from '../../assets/crown.svg';
import './style.scss'
const Navigation = ()=>{
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <Crown className='logo' />
            </Link>
            <div className='links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
            </div>        
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation
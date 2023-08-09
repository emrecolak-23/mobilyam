import { Outlet } from 'react-router-dom'
import { NavigationContainer, NavLinkContainer, NavLink, LogoContainer } from './navigation.style'
import { UserData } from '../../store/slices/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/slices/auth-slice';
import { RootState } from '../../store';
import SideBar from '../../components/side-bar/side-bar.component';

const Navigation = () => {

    const dispatch = useDispatch()


    const currentUser = useSelector<RootState, UserData | null>((state) => {
        return state.auth.currentUser
    })

    const handleSignOut = () => {
        dispatch<any>(signOut())
    }

    let authLink;

    if(!currentUser) {
        authLink = <NavLink to="/auth">Giriş</NavLink>
    } else {
        authLink = <NavLink to="/" onClick={handleSignOut}>
            Çıkış
        </NavLink>
    }



    return <>
        <NavigationContainer>
            <LogoContainer to="/">
                Mobilyam
            </LogoContainer>
            <NavLinkContainer>
                    {authLink}
            </NavLinkContainer>
        </NavigationContainer>
        { currentUser && <SideBar /> }
        <Outlet />
    </>

}


export default Navigation
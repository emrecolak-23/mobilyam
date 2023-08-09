import { HomeContainer } from "./home.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserData } from "../../store/slices/auth-slice";
import Spinner from "../../components/spinner/spinner.component";

const Home = () => {

    const [currentUser, isLoading] = useSelector<RootState, [UserData | null, boolean]>(state => {
        return [state.auth.currentUser, state.auth.isLoading]
    })

    let content;

    if(!currentUser) {
        content = isLoading ? <Spinner /> : <h1>Mobilyama hoş geldiniz</h1>
    } else {
        content = <h1>Hoş geldin {currentUser.email}</h1>
    }

    return <HomeContainer>
        {content}
    </HomeContainer>
}


export default Home
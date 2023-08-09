import { TopBarContainer } from "./top-bar.styles"
import { TitleContainer } from "./top-bar.styles"
import { Title } from "./top-bar.styles"
import SearchInput from "../search-input/search-input.component"
import Button from "../button/button.component"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface TopBarProps {
    title: string,
    buttonRoute: string,
    buttonTitle: string
    handleSearchTextChange: (text: string) => void
    searchText: string
}

const TopBar:FC<TopBarProps> = ({title, buttonRoute, buttonTitle, handleSearchTextChange, searchText}) => {

    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate(buttonRoute)
    }

    return <TopBarContainer>
                <TitleContainer>
                    <Title>{title}</Title>
                </TitleContainer>
                <SearchInput 
                    handleSearchTextChange={handleSearchTextChange}
                    searchText={searchText}
                />
                <Button onClick={handleButtonClick}>
                    {buttonTitle}
                </Button>
    </TopBarContainer>
}

export default TopBar
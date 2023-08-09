import { InputContainer, SearchIcon, Input } from "./search-input.styles"
import {AiOutlineSearch} from "react-icons/ai"
import { ChangeEvent, FC } from "react"


interface SearchInputProps {
    handleSearchTextChange: (text: string) => void
    searchText: string   
}

const SearchInput:FC<SearchInputProps> = ({handleSearchTextChange, searchText}) => {

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleSearchTextChange(event.target.value)
    }

    return <InputContainer>
        <SearchIcon ><AiOutlineSearch /></SearchIcon>
        <Input type="text" placeholder="Search..." value={searchText} onChange={handleOnChange} />
    </InputContainer>
}

export default SearchInput
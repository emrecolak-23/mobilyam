import { PageContainer } from "./brands.styles"
import { ContentContainer } from "./brands.styles"
import TopBar from "../../components/top-bar/top-bar.component"
import { useState } from "react"

const Brands = () => {

    const [searchText, setSearchText] = useState("")

    const handleSearchTextChange = (text: string) => {
        setSearchText(text)
    }

    return <PageContainer>
        <ContentContainer>
            <TopBar 
                title="Markalar" 
                buttonRoute="/brands/add" 
                buttonTitle="Marke Ekle"
                handleSearchTextChange={handleSearchTextChange}
                searchText={searchText}
            />
            Brands
        </ContentContainer>
    </PageContainer>
}


export default Brands
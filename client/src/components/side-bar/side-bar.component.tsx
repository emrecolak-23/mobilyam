import { SideBarContainer } from "./side-bar.styles";
import { NavLink } from "../../routes/navigation/navigation.style";

const SideBar = () => {

    const links = [
        { label: "Ana Sayfa", path: "/"},
        { label: "Marka İşlemleri", path: "/brands"},
        { label: "Ürün İşlemleri", path: "/products"},
        { label: "Şifre Değiştir", path: "/change-password"}
    ]

    const renderedLinks = links.map((link) => {
        return <NavLink key={link.label} to={link.path}>
            {link.label}
        </NavLink>
    })

    return <SideBarContainer>
        {renderedLinks}
    </SideBarContainer>
}


export default SideBar
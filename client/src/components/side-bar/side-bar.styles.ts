import styled from 'styled-components'

export const SideBarContainer = styled.div`
    position: absolute;
    top: 120px;
    left: 40px;
    height: 80vh;
    padding-top: 20px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: black;
    transition: transform 0.3s;
    transform: translateX(-200px);

    @media (min-width: 768px) {
        transform: translateX(0);
    }
`



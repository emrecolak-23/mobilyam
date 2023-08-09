import styled from "styled-components"


export const PageContainer = styled.div`
    position: absolute;
    top: 120px;
    left: 40px;
    right: 40px;
    height: 80vh;

    @media (min-width: 768px) {
        left: 200px;
    }
`

export const ContentContainer = styled.div`
    overflow: auto;
    z-index: 10;
    padding: 10;
    width: 100%;
    height: 100%;
    background-color: #f0f2fc;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border: 1px solid black;
`
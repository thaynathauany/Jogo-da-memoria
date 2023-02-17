import styled from 'styled-components'

export const Container = styled.div `
    width: 100%;
    max-width: 750px;
    margin: auto;
    display: flex;
    padding: 50px 0;

    @media (max-width: 1100px) {
        flex-direction: column;
    }
`

export const Info = styled.div `
    display: flex;
    flex-direction: column;
    width: auto;

    p {
        font-size: 10px;
        color: #6a7d8b;
    }

    @media (max-width: 1100px) {
        margin-bottom: 50px;
        align-items: center;
    }
`
export const LogoLink = styled.a `
    display: block;

    @media (max-width: 500px) {
        img {
          width: 100px;  
        }      
    }
`

export const InfoArea = styled.div `
    width: 100%;
    margin: 10px 0;

    @media (max-width: 1100px) {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`

export const GridArea = styled.div `
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 1100px) {
        justify-content: center;
        margin: 0 20px;
    }
`

export const Grid = styled.div `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr); //fica quatro itens um ao lado do outro
    gap: 10px;
    margin-left: 50px;

    @media (max-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
        margin: 0 ;
    }
`
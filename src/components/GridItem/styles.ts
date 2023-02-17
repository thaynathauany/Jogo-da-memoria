import styled from "styled-components";

type ContainerProps = {
    showBackground: boolean
}
export const Container = styled.div <ContainerProps>`
    background-color: ${props => props.showBackground === true ? '#fab244' : '#f48b84' };
    height: 160px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media (max-width: 750px) {
        height:100px;
    }
`

type IconProps = {
    opacity?: number
}
export const Icon = styled.img <IconProps> `
    width: 150px;
    height: 150px;
    opacity: ${props => props.opacity ? props.opacity : 1};

    @media (max-width: 750px) {
        width: 40px;
        height:80px;
    }
`
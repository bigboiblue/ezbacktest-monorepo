import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";

export const Button = styled(MuiButton)`
    background: none;
    border: none;
    color: #eee;
    padding: 1rem 4rem;
    border-radius: 0;
    height: 100%;
    font-family: "Work Sans", sans-serif;
    

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;

export const Wrapper = styled.div`
    position: relative;
    z-index: 9999;
    display: flex;
    padding: 0 20%;
    width: 100%;
`;

export const Container = styled.div`
    position: relative;
    display: flex;
    height: ${(props) => props.theme.height};
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Spacer = styled.div`
    flex: 1;
    height: 100%;
`;

export const LogoText = styled.h1`
    font: 2rem 'Pacifico', cursive;
    color: #eee;
    margin: 0;
`;

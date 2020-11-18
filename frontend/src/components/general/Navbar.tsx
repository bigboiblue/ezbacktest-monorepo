import React, { useContext } from "react";
import {
    Button, Container, Spacer, LogoText, Wrapper,
} from "./styles/NavBarStyles";
import { ThemeContext, ThemeType } from "../../styles/GlobalUserTheme";

interface Props {
    height: number;
}

function Navbar(Props: props): React.ReactElement {
    let theme: ThemeType["navbar"] = useContext(ThemeContext).navbar;

    const navItems = [
        <Button key="NavHome">Chart</Button>,
        <Button key="NavAbout">Trades</Button>, // Sort by strategy (or all)
    ];

    return (
        <Wrapper>
            <Container theme={theme}>
                <LogoText>ezBacktest</LogoText>
                <Spacer />
                {
                    navItems
                }
            </Container>
        </Wrapper>
    );
}

export default Navbar;

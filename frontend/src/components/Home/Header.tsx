import React, { useContext } from "react";
import { Email } from "@material-ui/icons";
import { ThemeContext } from "../../styles/GlobalUserTheme";
import {
    Button, Wrapper, Container, Subtitle, Title, Input, Form,
} from "./styles/HeaderStyle";

interface Props {

}

function Header(props: Props): React.ReactElement {
    let theme = useContext(ThemeContext);

    return (
        <>
            <Wrapper theme={theme}>
                <Container>
                    <Title>aapl 1D - Candlestick Chart</Title>
                </Container>
            </Wrapper>
        </>
    );
}

export default Header;

import styled from "styled-components";
import { Button as MuiButton, TextField } from "@material-ui/core";
import { math, lighten } from "polished";


export const Wrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.4);
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%2313072e' stroke-width='67.1' stroke-opacity='0.04' %3E%3Ccircle fill='%23e0a4a4' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23d499a0' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23c98f9c' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23be8498' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23b27a94' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23a77090' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%239b668c' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23905c88' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23855284' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23794880' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%236e3f7c' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23623578' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23562c74' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%234a236f' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%233e196b' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23301067' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23200762' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%2306005e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E"); */
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.81'%3E%3Cpath fill='%2385577e' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23803c81' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23682777' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%234b156a' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%232d0957' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%2326064c' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%231f0441' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23190235' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23120129' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230c001c' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E"); */
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg stroke='%23CCC' stroke-width='0' %3E%3Crect fill='%23F5F5F5' x='-60' y='-60' width='110' height='240'/%3E%3C/g%3E%3C/svg%3E"); */
    background-attachment: fixed;
    background-size: cover;
    /* background by SVGBackgrounds.com */
    width: 100%;
    padding-left: 30%;
    padding-right: 30%

`;

export const Container = styled.div`
    display: flex;
    /* padding: 10rem 30% 17rem 30%; Bottom has additional padding for curve */
    flex-direction: column;
    /* background: black; */
    /* min-width: 410px; */

    & > * {
        margin: 1rem;
    }
`;

export const Form = styled.div`
    display: flex;
    justify-content: space-between;
`;


const buttonBgColor = "#470430";
export const Button = styled(MuiButton)`
    background-color: ${buttonBgColor};
    color: #ffffff;
    padding: 1rem;
    width: 10rem;
    font-family: "Work Sans", sans-serif;
    white-space: pre;

    &:hover {
        background-color: ${lighten(0.04, buttonBgColor)}
    }
`;

export const Title = styled.h1`
    font: 500 1.8rem "Pacifico", sans-serif;
    text-align: center;
    color: #262626;
`;

export const Subtitle = styled.h2`
    font: italic 200 1.5rem "Work Sans", sans-serif;
    color: white;
`;

export const Input = styled(TextField)`

    & input {
        background: #eeeeee;
        border-radius: 0.25rem;
        font-family: "Work Sans", sans-serif;

    }
    & label {
        font-family: "Work Sans", sans-serif;
    }

    flex:1;
    margin-right: 2rem;
`;

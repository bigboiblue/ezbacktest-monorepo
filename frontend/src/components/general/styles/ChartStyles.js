import styled from "styled-components";

export const temp = 0;

export const ChartContainer = styled.div`
    width: 100%;
    height: 40rem;
    background: rgba(255, 255, 255, 0.7);

    & .dygraph-axis-label{
        color: #00573b;
        font: 0.75rem sans-serif;


        user-select: none; /** */
        pointer-events: none; /** */
        position: absolute; /** Used to click through text, allowing scaling using axis */
    }

    & .dygraph-axis-label-y1 {
        font: 0rem sans-serif;
    }
`;


export const ChartContainer2 = styled.div`
    width: 100%;
    height: 10rem;
    background: rgba(255, 255, 255, 0.7);

    & .dygraph-axis-label{
        color: #00573b;
        font: 0.75rem sans-serif;


        user-select: none; /** */
        pointer-events: none; /** */
        position: absolute; /** Used to click through text, allowing scaling using axis */
    }

    & .dygraph-axis-label-y1 {
        font: 0rem sans-serif;
    }
`;

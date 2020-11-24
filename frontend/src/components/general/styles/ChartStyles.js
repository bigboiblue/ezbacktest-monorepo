import styled from "styled-components";

export const temp = 0;

export const ChartContainer = styled.div`
    width: 100%;
    background: ${(props) => props.bg_color};
    flex: ${(props) => props.flex};
    order: ${(props) => props.order};


    & .dygraph-axis-label{
        color:  ${(props) => props.font_color};
        font: 0.75rem sans-serif;


        user-select: none; /** */
        pointer-events: none; /** */
        position: absolute; /** Used to click through text, allowing scaling using axis */
    }

    & .dygraph-axis-label-y1 {
        font: 0rem sans-serif;
    }
`;

export const AllChartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: ${(props) => props.height};
`;


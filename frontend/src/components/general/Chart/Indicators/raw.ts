import { CalculateOptions, CalculateReturn } from "../typings/script";

// Indicator main function is called calculate
export default function calculate({ data, params }: CalculateOptions): CalculateReturn {
    const styles = params.styles;
    return {
        data, styles,
    };
}

// Each calculate function must return data, style and colors

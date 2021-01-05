import { CalculateOptions, CalculateReturn } from "../typings/script";

// Indicator main function is called calculate
export default function calculate({ data, params }: CalculateOptions): CalculateReturn {
    const { style, colors } = params;
    return {
        data, style, colors, labels: ["Open", "High", "Low", "Close"],
    };
}

// Each calculate function must return data, style and colors

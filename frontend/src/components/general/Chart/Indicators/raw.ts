import { CalculateOptions } from "../chart_typings";

// Indicator main function is called calculate
export default function calculate({ data, style, colors }: CalculateOptions): Record<string, any> {
    return { data, style, colors };
}

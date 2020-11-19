export type Chart = {
    user_id: number;
    name: string;
    current: boolean;
    sectors: Sector[];
    theming?: Theming;
}

export type Sector = {
    position: number;
    size: number;
    indicators: Indicator[];
    theming?: Theming;
}

export type Theming = {
    bg_color?: string;
    font_color?: string;
    axis_line_color?: string;
    axis_bg_color?: string;
    x_axis_margin?: number;
    y_axis_margin?: number;
    grid_enabled?: boolean;
    grid_color?: string;
}

export type Indicator = {
    link: string;
    params?: Record<string, any>;
    z_index: number;
}

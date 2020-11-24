import { ChartSettings as ChartSettingsType, Sector, Theming } from "./chart_typings";

class ChartSettings implements ChartSettingsType {
    isInitialised = false;

    user_id: number = null;
    current: boolean = null;
    date_start: Date = null;
    date_end: Date = null;
    name: string = null;
    period: string = null;
    symbol: string = null;
    theming: Theming = {};
    sectors: Sector[] = [];

    initialise(other: ChartSettingsType): void {
        this.user_id = other.user_id;
        this.current = other.current;
        this.date_start = other.date_start;
        this.date_end = other.date_end;
        this.name = other.name;
        this.period = other.period;
        this.symbol = other.symbol;
        if (other.theming) this.theming = other.theming;
        this.sectors = other.sectors;

        this.isInitialised = true;
    }
}

const instance = new ChartSettings();
export default instance;

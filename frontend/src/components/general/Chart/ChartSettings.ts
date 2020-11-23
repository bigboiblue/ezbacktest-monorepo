import { ChartSettings as ChartSettingsType } from "./chart_typings";

class ChartSettings implements ChartSettingsType {
    isInitialised = false;

    user_id = null;
    current = null;
    date_start = null;
    date_end = null;
    name = null;
    period = null;
    symbol = null;
    theming = {};
    sectors = [];

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

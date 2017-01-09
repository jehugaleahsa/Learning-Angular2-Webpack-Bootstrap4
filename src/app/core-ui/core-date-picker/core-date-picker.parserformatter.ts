import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

export class CoreDatePickerParserFormatter extends NgbDateParserFormatter {
    constructor(private dateFormat: string) {
        super();
    }

    public format(date: NgbDateStruct): string {
        if (date === null) {
            return "";
        }
        const value = moment({
            day: date.day,
            month: date.month - 1,
            year: date.year
        });
        return value.format(this.dateFormat);
    }

    public parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        const date = moment(value, this.dateFormat);
        if (!date.isValid()) {
            return null;
        }
        return {
            day: date.date(),
            month: date.month() + 1,
            year: date.year()
        };
    }
}

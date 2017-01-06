import { Component, Input } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "core-date-picker",
    template: require("./core-date-picker.component.html")
})
export class CoreDatePickerComponent {
    private _date: NgbDateStruct;
    private _minDate: NgbDateStruct;
    private _maxDate: NgbDateStruct;

    @Input() public get date(): Date {
        return CoreDatePickerComponent.toDate(this._date);
    }

    public set date(value: Date) {
        this._date = CoreDatePickerComponent.toDateStruct(value);
    }

    @Input("min-date") public get minDate(): Date {
        return CoreDatePickerComponent.toDate(this._minDate);
    }

    public set minDate(value: Date) {
        this._minDate = CoreDatePickerComponent.toDateStruct(value);
    }

    @Input("max-date") public get maxDate(): Date {
        return CoreDatePickerComponent.toDate(this._maxDate);
    }

    public set maxDate(value: Date) {
        this._maxDate = CoreDatePickerComponent.toDateStruct(value);
    }

    private static toDate(value: NgbDateStruct): Date {
        if (value === null) {
            return null;
        }
        return new Date(value.year, value.month - 1, value.day);
    }

    private static toDateStruct(value: Date): NgbDateStruct {
        if (value === null) {
            return null;
        }
        return {
            day: value.getDate(),
            month: value.getMonth() + 1,
            year: value.getFullYear()
        };
    }
}

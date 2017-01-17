import { Component } from "@angular/core";
import * as moment from "moment";

import "./date-picker-demo.component.scss";

@Component({
    template: require("./date-picker-demo.component.html")
})
export class DatePickerDemoComponent {
    private _date = new Date();
    private _minDate = moment().subtract(7, "days").toDate();
    private _maxDate = moment().add(7, "days").toDate();
}

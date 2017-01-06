import { Component } from "@angular/core";
import * as moment from "moment";

import "./app.component.scss";

@Component({
    selector: "sample-app",
    template: require("./app.component.html")
})
export class AppComponent {
    private _isPanelOpen: boolean;
    private _date = new Date();
    private _minDate = moment().subtract(7, "days").toDate();
    private _maxDate = moment().add(7, "days").toDate();

    private get collapsibleMessage() {
        if (this._isPanelOpen) {
            return "Click here to collapse.";
        } else {
            return "Click here to expand.";
        }
    }
}

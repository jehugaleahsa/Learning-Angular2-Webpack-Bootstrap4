import { Component } from "@angular/core";
import * as moment from "moment";

import { ControlStatus } from "./core-ui/control-status";

import "./app.component.scss";

@Component({
    selector: "sample-app",
    template: require("./app.component.html")
})
export class AppComponent {
    private ControlStatus: typeof ControlStatus = ControlStatus;

    private _isPanelOpen: boolean;
    private _date = new Date();
    private _minDate = moment().subtract(7, "days").toDate();
    private _maxDate = moment().add(7, "days").toDate();
    private _panelStatus: ControlStatus = ControlStatus.None;
    private _collapsiblePanelStatus: ControlStatus = ControlStatus.None;

    private get collapsibleMessage() {
        if (this._isPanelOpen) {
            return "Click here to collapse.";
        } else {
            return "Click here to expand.";
        }
    }

    private setPanelNormal(): void {
        this._panelStatus = ControlStatus.None;
    }

    private setPanelSuccess(): void {
        this._panelStatus = ControlStatus.Success;
    }

    private setPanelError(): void {
        this._panelStatus = ControlStatus.Error;
    }

    private setCollapsiblePanelNormal(): void {
        this._collapsiblePanelStatus = ControlStatus.None;
    }

    private setCollapsiblePanelSuccess(): void {
        this._collapsiblePanelStatus = ControlStatus.Success;
    }

    private setCollapsiblePanelError(): void {
        this._collapsiblePanelStatus = ControlStatus.Error;
    }
}

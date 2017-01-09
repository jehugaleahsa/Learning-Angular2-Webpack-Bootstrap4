import { Component, Input } from "@angular/core";

import { ControlStatus } from "../control-status";

import "./core-panel.component.scss";

@Component({
    selector: "core-panel",
    template: require("./core-panel.component.html")
})
export class CorePanelComponent {
    private _status: ControlStatus = ControlStatus.None;
    private _panelOutlineClass: string = "";
    private _headerClass: string = "";

    @Input() public iconClass: String;
    @Input() public title: String;

    @Input() public get status(): ControlStatus {
        return this._status;
    }

    public set status(value: ControlStatus) {
        if (typeof ControlStatus[value] === "undefined") {
            this._status = ControlStatus.None;
        } else {
            this._status = value;
        }
        if (this._status === ControlStatus.Success) {
            this._panelOutlineClass = "card-outline-success";
            this._headerClass = "card-success card-inverse";
        } else if (this._status === ControlStatus.Error) {
            this._panelOutlineClass = "card-outline-danger";
            this._headerClass = "card-danger card-inverse";
        } else {
            this._panelOutlineClass = "";
            this._headerClass = "";
        }
    }
}

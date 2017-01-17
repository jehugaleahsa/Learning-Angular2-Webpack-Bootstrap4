import { Component, Input } from "@angular/core";

import "./core-panel.component.scss";

@Component({
    selector: "core-panel",
    template: require("./core-panel.component.html")
})
export class CorePanelComponent {
    private _status: string = null;
    private _outlineClass: string = "";
    private _headerClass: string = "";

    @Input() public iconClass: String;
    @Input() public title: String;

    @Input() public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._status = value;
        if (this._status === null) {
            this._outlineClass = "";
            this._headerClass = "";
            return;
        }
        this._outlineClass = `card-outline-${this._status}`;
        this._headerClass = `card-${this._status} card-inverse`;
    }
}

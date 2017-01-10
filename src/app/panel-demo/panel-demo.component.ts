import { Component } from "@angular/core";

import { ControlStatus } from "../core-ui/control-status";

import "./panel-demo.component.scss";

@Component({
    template: require("./panel-demo.component.html")
})
export class PanelDemoComponent {
    private ControlStatus: typeof ControlStatus = ControlStatus;

    private _panelStatus: ControlStatus = ControlStatus.None;

    private setPanelNormal(): void {
        this._panelStatus = ControlStatus.None;
    }

    private setPanelSuccess(): void {
        this._panelStatus = ControlStatus.Success;
    }

    private setPanelError(): void {
        this._panelStatus = ControlStatus.Error;
    }
}

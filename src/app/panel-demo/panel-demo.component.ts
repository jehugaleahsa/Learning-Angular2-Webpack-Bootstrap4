import { Component } from "@angular/core";

import "./panel-demo.component.scss";

@Component({
    template: require("./panel-demo.component.html")
})
export class PanelDemoComponent {
    private _panelStatus: string = null;

    private setPanelNormal(): void {
        this._panelStatus = null;
    }

    private setPanelSuccess(): void {
        this._panelStatus = "success";
    }

    private setPanelError(): void {
        this._panelStatus = "danger";
    }
}

import { Component } from "@angular/core";

import { ControlStatus } from "../core-ui/control-status";
import {
    CoreCollapsiblePanelChangedEvent
} from "../core-ui/core-collapsible-panel/core-collaspsible-panel-changed-event";

import "./collapsible-panel-demo.component.scss";

@Component({
    template: require("./collapsible-panel-demo.component.html")
})
export class CollapsiblePanelDemoComponent {
    private _isPanelOpen: boolean;
    private _collapsiblePanelStatus: ControlStatus = ControlStatus.None;

    private get collapsibleMessage() {
        if (this._isPanelOpen) {
            return "Click here to collapse.";
        } else {
            return "Click here to expand.";
        }
    }

    private updatePanelStatus(event: CoreCollapsiblePanelChangedEvent): void {
        this._isPanelOpen = event.isOpen;
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

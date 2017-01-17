import { Component } from "@angular/core";

import {
    CoreCollapsiblePanelChangedEvent
} from "../core-ui/core-collapsible-panel/core-collaspsible-panel-changed-event";

import "./collapsible-panel-demo.component.scss";

@Component({
    template: require("./collapsible-panel-demo.component.html")
})
export class CollapsiblePanelDemoComponent {
    private _isPanelOpen: boolean;
    private _collapsiblePanelStatus: string = null;

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
        this._collapsiblePanelStatus = null;
    }

    private setCollapsiblePanelSuccess(): void {
        this._collapsiblePanelStatus = "success";
    }

    private setCollapsiblePanelError(): void {
        this._collapsiblePanelStatus = "danger";
    }
}

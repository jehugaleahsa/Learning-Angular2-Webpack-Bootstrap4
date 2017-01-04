import { Component, Input, ViewChild } from "@angular/core";
import { NgbAccordion, NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";

import "bootstrap/dist/css/bootstrap.css";

@Component({
    selector: "core-collapsible-panel",
    template: require("./core-collapsible-panel.component.html")
})
export class CoreCollapsiblePanelComponent {
    private static _panelId: string = "main-panel";
    private _isOpen: boolean = false;
    @ViewChild(".main-accordion") accordion: NgbAccordion;

    @Input()
    public title: String;

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public set isOpen(value: boolean) {
        if (value !== this._isOpen) {
            this._isOpen = value;
            this.accordion.toggle(CoreCollapsiblePanelComponent._panelId);
        }
    }

    public onPanelChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === CoreCollapsiblePanelComponent._panelId) {
            this._isOpen = $event.nextState;
        }
    }
}

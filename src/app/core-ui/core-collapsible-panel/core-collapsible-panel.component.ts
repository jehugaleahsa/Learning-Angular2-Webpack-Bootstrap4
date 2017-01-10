import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { NgbAccordion, NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";

import { ControlStatus } from "../control-status";
import { CoreCollapsiblePanelChangedEvent } from "./core-collaspsible-panel-changed-event";

import "./core-collapsible-panel.component.scss";

@Component({
    selector: "core-collapsible-panel",
    template: require("./core-collapsible-panel.component.html")
})
export class CoreCollapsiblePanelComponent {
    private static _panelId: string = "main-panel";
    private _isOpen: boolean = false;
    private _status: ControlStatus = ControlStatus.None;
    private _outlineClass: string = "";
    private _headerClass: string = "";

    @Input()
    public title: String;

    @Input()
    public get isOpen(): boolean {
        return this._isOpen;
    }

    public set isOpen(value: boolean) {
        if (value !== this._isOpen) {
            this._isOpen = value;
        }
    }

    public toggle(): boolean {
        this._isOpen = !this._isOpen;
        const event = new CoreCollapsiblePanelChangedEvent();
        event.isOpen = this._isOpen;
        this.isOpenChanged.next(event);
        return false;
    }

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
            this._outlineClass = "card-outline-success";
            this._headerClass = "card-success card-inverse";
        } else if (this._status === ControlStatus.Error) {
            this._outlineClass = "card-outline-danger";
            this._headerClass = "card-danger card-inverse";
        } else {
            this._outlineClass = "";
            this._headerClass = "";
        }
    }

    @Output() private isOpenChanged = new EventEmitter<CoreCollapsiblePanelChangedEvent>();
}

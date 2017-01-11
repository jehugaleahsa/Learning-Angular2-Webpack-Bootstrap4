import { Component, Input, ViewChild } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import "./core-spinner-modal.component.scss";

@Component({
    selector: "core-spinner-modal",
    template: require("./core-spinner-modal.component.html")
})
export class CoreSpinnerModalComponent {
    private modalReference: NgbModalRef = null;
    @ViewChild("spinnerModal") private spinnerModal: any;

    constructor(private modalService: NgbModal) {
    }

    @Input() public get isOpen(): boolean {
        return this.modalReference !== null;
    }

    public set isOpen(value: boolean) {
        if (value) {
            if (this.modalReference !== null) {
                return;
            }
            this.modalReference = this.modalService.open(this.spinnerModal, {
                backdrop: "static",
                keyboard: false,
                size: "sm",
                windowClass: "core-spinner-modal"
            });
        } else {
            if (this.modalReference === null) {
                return;
            }
            this.modalReference.close(this.spinnerModal);
            this.modalReference = null;
        }
    }
}

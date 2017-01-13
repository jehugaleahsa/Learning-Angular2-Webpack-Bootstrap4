import { Component, Input, ViewChild } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import "./core-confirmation-modal.component.scss";

@Component({
    selector: "core-confirmation-modal",
    template: require("./core-confirmation-modal.component.html")
})
export class CoreConfirmationModalComponent {
    private modalReference: NgbModalRef = null;
    @ViewChild("confirmationModal") private confirmationModal: any;

    constructor(private modalService: NgbModal) {
    }

    @Input() public title: string = "Confirm";

    private confirm(value: boolean): void {
        this.modalReference.close(value);
    }

    public open(): Observable<boolean> {
        return Observable.create((observer: any) => {
            this.modalReference = this.modalService.open(this.confirmationModal, {
                backdrop: "static",
                keyboard: true,
                windowClass: "core-confirmation-modal"
            });
            this.modalReference.result.then((value: boolean) => {
                observer.next(value);
                observer.complete();
            }).catch((reason: any) => {
                observer.next(false);
                observer.complete();
            });
        });
    }
}

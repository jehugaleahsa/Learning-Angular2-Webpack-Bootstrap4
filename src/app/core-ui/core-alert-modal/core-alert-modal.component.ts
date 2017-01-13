import { Component, Input, ViewChild } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import "./core-alert-modal.component.scss";

@Component({
    selector: "core-alert-modal",
    template: require("./core-alert-modal.component.html")
})
export class CoreAlertModalComponent {
    private modalReference: NgbModalRef = null;
    @ViewChild("alertModal") private alertModal: any;

    constructor(private modalService: NgbModal) {
    }

    @Input() public title: string = "Alert";

    private close(): boolean {
        this.modalReference.close(true);
        return false;
    }

    public open(): Observable<boolean> {
        return Observable.create((observer: any) => {
            this.modalReference = this.modalService.open(this.alertModal, {
                backdrop: "static",
                keyboard: true,
                windowClass: "core-alert-modal"
            });
            this.modalReference.result.then((value: boolean) => {
                observer.next(value);
                observer.complete();
            }).catch((reason: any) => {
                observer.next(true);
                observer.complete();
            });
        });
    }
}

import { Component, ViewChild } from "@angular/core";

import { CoreConfirmationModalComponent } from "../core-ui/core-confirmation-modal/core-confirmation-modal.component";

@Component({
    template: require("./modal-demo.component.html")
})
export class ModalDemoComponent {
    private confirmResult: string = "Click the button to see the result.";
    @ViewChild(CoreConfirmationModalComponent) private confirmModal: CoreConfirmationModalComponent;

    public showConfirmation(): void {
        this.confirmModal.open().subscribe((value: boolean) => {
            this.confirmResult = value ? "Confirmed" : "Canceled";
        });
    }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";
import { Observable } from "rxjs";

import { CoreAlertModalComponent } from "../core-ui/core-alert-modal/core-alert-modal.component";
import { CoreConfirmationModalComponent } from "../core-ui/core-confirmation-modal/core-confirmation-modal.component";
import { CoreSpinnerModalComponent } from "../core-ui/core-spinner-modal/core-spinner-modal.component";

import { Account } from "./account";
import { AccountService } from "./account.service";
import { LookupService } from "./lookup.service";
import { State } from "./state";

import "./form-demo.component.scss";

@Component({
    template: require("./form-demo.component.html")
})
export class FormsDemoComponent implements OnInit {
    private isDataLoaded = false;
    private account: Account = null;
    private states: State[] = null;
    private isSubmitted = false;
    private confirmationMessage: string = null;
    private errorMessage: string = null;
    @ViewChild("confirmationModal") private confirmationModal: CoreConfirmationModalComponent;
    @ViewChild("errorModal") private errorModal: CoreAlertModalComponent;
    @ViewChild("spinnerModal") private spinnerModal: CoreSpinnerModalComponent;

    constructor(
        private accountService: AccountService,
        private lookupService: LookupService) {
    }

    public ngOnInit() {
        this.reload();
    }

    private submit(): boolean {
        this.confirmationMessage = "Are you sure you want to submit?";
        this.confirmationModal.open().filter((result) => result).subscribe(() => {
            this.isSubmitted = true;
        });
        return false;
    }

    private reset(): boolean {
        this.confirmationMessage = "Are you sure you want to reset?";
        this.confirmationModal.open().filter((result) => result).subscribe(() => {
            this.isSubmitted = false;
            this.reload();
        });
        return false;
    }

    private simulateError(): boolean {
        this.isSubmitted = false;
        this.reload(true);
        return false;
    }

    private reload(isError = false): void {
        this.isDataLoaded = false;
        this.spinnerModal.isOpen = true;
        const requests: any[] = [
            this.accountService.getAccount(123),
            this.lookupService.getStates()
        ];
        if (isError) {
            const delayedThrow = Observable.concat(Observable.timer(1000), Observable.throw({
                Message: "An error occurred."
            }));
            requests.push(delayedThrow);
        }
        Observable.forkJoin(requests).subscribe((results: any[]) => {
            this.account = results[0] as Account;
            this.states = _.sortBy(results[1] as State[], "abbreviation");
            this.isDataLoaded = true;
            this.spinnerModal.isOpen = false;
        }, (error) => {
            this.errorMessage = error.Message;
            this.spinnerModal.isOpen = false;
            this.errorModal.open().subscribe(() => {
                ;
            });
        });
    }

    private getPanelStatus(form: FormGroup): string {
        if (this.isSubmitted) {
            return form.valid ? "success" : "danger";
        } else {
            return "primary";
        }
    }
}

import { Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, NgForm, NgModelGroup } from "@angular/forms";
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
    private isSimulatingError = false;
    private account: Account = null;
    private states: State[] = null;
    private confirmationMessage: string = null;
    private errorMessage: string = null;
    @ViewChild("frmTop") private pageForm: NgForm = null;
    @ViewChildren(NgModelGroup) private modelGroups: QueryList<NgModelGroup> = null;
    @ViewChild("confirmationModal") private confirmationModal: CoreConfirmationModalComponent = null;
    @ViewChild("errorModal") private errorModal: CoreAlertModalComponent = null;
    @ViewChild("spinnerModal") private spinnerModal: CoreSpinnerModalComponent = null;

    constructor(
        private accountService: AccountService,
        private lookupService: LookupService) {
    }

    public ngOnInit() {
        this.reload();
    }

    private submit(): boolean {
        this.pageForm.onSubmit(null);
        if (this.pageForm.valid) {
            this.confirmationMessage = "Are you sure you want to submit?";
            this.confirmationModal.open().filter((result) => result).subscribe(() => {
                this.spinnerModal.isOpen = true;
                let request: Observable<any> = Observable.timer(500).take(1);
                if (this.isSimulatingError) {
                    request = request.concat(Observable.throw({
                        Message: "An error occurred. Your request could not be submitted."
                    }));
                }
                request.subscribe((x) => {
                    console.log("Success");
                    this.spinnerModal.isOpen = false;
                }, (error) => {
                    console.log("Error");
                    this.errorMessage = error.Message;
                    this.spinnerModal.isOpen = false;
                    this.errorModal.open().subscribe(() => {
                        ;
                    });
                });
            });
        }
        return false;
    }

    private reset(): boolean {
        this.confirmationMessage = "Are you sure you want to reset?";
        this.confirmationModal.open().filter((result) => result).subscribe(() => {
            this.reload(this.isSimulatingError);
        });
        return false;
    }

    private reload(isError = false): void {
        this.pageForm.resetForm();
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
            this.errorMessage = error.Message + " Click OK to reload.";
            this.spinnerModal.isOpen = false;
            this.errorModal.open().subscribe(() => {
                this.reload();
            });
        });
    }

    private getPanelStatus(form: NgModelGroup): string {
        if (this.pageForm.submitted) {
            return form.valid ? "success" : "danger";
        } else {
            return null;
        }
    }

    private isErrorSummaryShown(form: NgForm): boolean {
        return form.submitted && form.invalid;
    }
}

import { Component, Input } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
    selector: "core-form-group",
    template: require("./form-group.component.html")
})
export class FormGroupComponent {
    @Input() public form: NgForm;
    @Input() public groupName: string;
    @Input() public controlName: string;

    private getControlStatus(): string {
        const control = this.getControl();
        if (!control) {
            return "";
        }
        if (this.form.submitted || control.dirty) {
            return control.valid ? "has-success" : "has-danger";
        }
        return "";
    }

    private isControlInvalid(): boolean {
        const control = this.getControl();
        if (!control) {
            return false;
        }
        if (this.form.submitted || control.dirty) {
            return control.invalid;
        } else {
            return false;
        }
    }

    private isRequiredError(): boolean {
        const errors = this.getErrors();
        return errors.required;
    }

    private isEmailError(): boolean {
        const errors = this.getErrors();
        return errors.email;
    }

    private getErrors(): any {
        const control = this.getControl();
        if (!control || control.valid) {
            return {};
        }
        const errors: any = control.errors;
        return errors;
    }

    private getControl(): FormControl {
        if (!this.form) {
            return null;
        }
        const group = this.form.controls[this.groupName] as FormGroup;
        if (!group) {
            return null;
        }
        const control = group.controls[this.controlName] as FormControl;
        return control;
    }
}

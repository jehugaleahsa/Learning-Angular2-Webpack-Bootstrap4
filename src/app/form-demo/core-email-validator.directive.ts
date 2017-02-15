import { Directive, forwardRef, Provider } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: "[core-email-validator][type=text][ngModel]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => CoreEmailValidatorDirective),
        multi: true
    }]
})
export class CoreEmailValidatorDirective implements Validator {
    public validate(control: AbstractControl): {[key: string]: any} {
        if (control.value == null || typeof control.value !== "string") {
            return null;
        }
        if (/.+?@.+/.test(control.value)) {
            return null;
        }
        return { email: true };
    }
}

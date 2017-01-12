import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "template[tabTitle]"
})
export class CoreRoutingTabTitleDirective {
    constructor(public template: TemplateRef<any>) {
    }
}

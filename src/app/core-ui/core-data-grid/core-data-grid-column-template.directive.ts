import { Directive, TemplateRef } from "@angular/core";

import { CoreDataGridColumnDirective } from "./core-data-grid-column.directive";

export interface IColumnTemplateContext {
    column: CoreDataGridColumnDirective;
    record: any;
    value: any;
}

@Directive({
    selector: "template[columnContent]"
})
export class CoreDataGridColumnTemplateDirective {
    constructor(public template: TemplateRef<IColumnTemplateContext>) {
    }
}

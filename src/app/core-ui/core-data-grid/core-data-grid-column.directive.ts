import { ContentChild, Directive, Input } from "@angular/core";

import { CoreDataGridColumnTemplateDirective } from "./core-data-grid-column-template.directive";
import {
    IFilterOption
} from "./core-data-grid-option-filter/core-data-grid-option-filter.component";

@Directive({
    selector: "core-data-grid-column"
})
export class CoreDataGridColumnDirective {
    @ContentChild(CoreDataGridColumnTemplateDirective)
    public contentTemplate: CoreDataGridColumnTemplateDirective = null;

    @Input() public headerName: string = null;
    @Input() public bind: string = null;
    @Input() public isSortable: boolean = false;
    @Input() public filter: string = null;
    @Input() public currencyFormat: string = null;
    @Input() public dateFormat: string = null;
    @Input() public decimalFormat: string = null;
    @Input() public percentFormat: string = null;
    @Input() public options: IFilterOption[];
}

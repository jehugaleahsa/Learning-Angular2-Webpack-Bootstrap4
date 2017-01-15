import { Directive, Input } from "@angular/core";

@Directive({
    selector: "core-data-grid-column"
})
export class CoreDataGridColumnDirective {
    @Input() public headerName: string = null;
    @Input() public bind: string = null;
    @Input() public isSortable: boolean = false;
    @Input() public filter: string = null;
    @Input() public currencyFormat: string = null;
    @Input() public dateFormat: string = null;
    @Input() public decimalFormat: string = null;
    @Input() public percentFormat: string = null;
}

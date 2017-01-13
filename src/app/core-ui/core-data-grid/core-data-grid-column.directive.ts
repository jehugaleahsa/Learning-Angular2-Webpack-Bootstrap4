import { Directive, Input } from "@angular/core";

@Directive({
    selector: "core-data-grid-column"
})
export class CoreDataGridColumnDirective {
    @Input() public headerName: string = null;
    @Input() public bind: string = null;
    @Input() public isSortable: boolean = false;
}

import { Directive, Input } from "@angular/core";

@Directive({
    selector: "core-data-grid-column"
})
export class CoreDataGridColumnDirective {
    @Input() public name: string = null;
    @Input() public bind: string = null;
}

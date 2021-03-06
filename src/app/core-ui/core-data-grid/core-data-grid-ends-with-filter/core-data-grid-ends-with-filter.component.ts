import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "core-data-grid-ends-with-filter",
    template: require("./core-data-grid-ends-with-filter.component.html")
})
export class CoreDataGridEndsWithFilterComponent {
    @Input() public model: any;

    @Output() public filterApplied = new EventEmitter<any>();
    @Output() public filterCleared = new EventEmitter<any>();
    @Output() public filterEditorClosed = new EventEmitter<any>();

    public applyFilter(): boolean {
        this.filterApplied.next();
        return false;
    }

    public clearFilter(): boolean {
        this.filterCleared.next();
        return false;
    }

    public closeFilterEditor(): boolean {
        this.filterEditorClosed.next();
        return false;
    }
}

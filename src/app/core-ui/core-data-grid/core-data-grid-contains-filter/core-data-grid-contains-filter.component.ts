import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "core-data-grid-contains-filter",
    template: require("./core-data-grid-contains-filter.component.html")
})
export class CoreDataGridContainsFilterComponent {
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

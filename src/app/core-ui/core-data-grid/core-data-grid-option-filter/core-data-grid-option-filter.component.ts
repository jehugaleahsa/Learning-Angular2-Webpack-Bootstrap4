import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface IFilterOption {
    value: any;
    description: string;
}

@Component({
    selector: "core-data-grid-option-filter",
    template: require("./core-data-grid-option-filter.component.html")
})
export class CoreDataGridOptionFilterComponent {
    @Input() public model: any;
    @Input() public options: IFilterOption[];
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

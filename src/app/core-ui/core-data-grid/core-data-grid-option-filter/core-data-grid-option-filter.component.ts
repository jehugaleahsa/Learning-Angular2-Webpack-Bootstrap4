import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import "./core-data-grid-option-filter.component.scss";

export interface IFilterOption {
    value: any;
    description: string;
}

@Component({
    selector: "core-data-grid-option-filter",
    template: require("./core-data-grid-option-filter.component.html")
})
export class CoreDataGridOptionFilterComponent implements OnInit {
    private exclusions = new Set<any>();
    @Input() public model: any;
    @Input() public options: IFilterOption[];
    @Output() public filterApplied = new EventEmitter<any>();
    @Output() public filterCleared = new EventEmitter<any>();
    @Output() public filterEditorClosed = new EventEmitter<any>();

    public ngOnInit(): void {
        for (const optionValue of this.model.value) {
            this.exclusions.add(optionValue);
        }
    }

    private isIncluded(optionValue: any): boolean {
        const isExcluded = this.exclusions.has(optionValue);
        return !isExcluded;
    }

    private include(optionValue: any, value: boolean): void {
        if (value) {
            this.exclusions.delete(optionValue);
        } else {
            this.exclusions.add(optionValue);
        }
        this.model.value.splice(0);
        this.exclusions.forEach((e) => this.model.value.push(e));
    }

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

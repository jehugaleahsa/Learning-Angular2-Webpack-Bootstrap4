import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList
} from "@angular/core";

import { CoreDataGridColumnDirective } from "./core-data-grid-column.directive";

import "./core-data-grid.component.scss";

@Component({
    selector: "core-data-grid",
    template: require("./core-data-grid.component.html")
})
export class CoreDataGridComponent implements OnInit {
    private sortField: string = null;
    private isSortDescending: boolean = false;
    @ContentChildren(CoreDataGridColumnDirective) public columns: CoreDataGridColumnDirective;
    @Input() public data: any[];
    @Output() public onInit = new EventEmitter<CoreDataGridComponent>();

    public ngOnInit(): void {
        this.onInit.next(this);
    }

    private sortBy(column: CoreDataGridColumnDirective): boolean {
        if (this.sortField === column.bind) {
            this.isSortDescending = !this.isSortDescending;
        } else {
            this.sortField = column.bind;
            this.isSortDescending = false;
        }
        return false;
    }

    private getSortClass(column: CoreDataGridColumnDirective): string {
        if (this.sortField === column.bind) {
            if (this.isSortDescending) {
                return "fa-sort-desc";
            } else {
                return "fa-sort-asc";
            }
        } else {
            return "fa-sort";
        }
    }
}

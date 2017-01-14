import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList
} from "@angular/core";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

import { CoreDataGridColumnDirective } from "./core-data-grid-column.directive";

import "./core-data-grid.component.scss";

type FilterFunc = (value: any, index: number, array: any[]) => boolean;

interface IFilterConfig {
    column: CoreDataGridColumnDirective;
    data: any;
    filter: FilterFunc;
}

@Component({
    selector: "core-data-grid",
    template: require("./core-data-grid.component.html")
})
export class CoreDataGridComponent implements AfterContentInit, OnInit {
    private sortField: string = null;
    private isSortDescending: boolean = false;
    private filter: FilterFunc = CoreDataGridComponent.getDefaultFilter();
    private columnFilterConfigs = new Map<string, IFilterConfig>();
    @ContentChildren(CoreDataGridColumnDirective) public columns: QueryList<CoreDataGridColumnDirective>;
    @Input() public data: any[];
    @Output() public onInit = new EventEmitter<CoreDataGridComponent>();

    public ngOnInit(): void {
        this.onInit.next(this);
    }

    public ngAfterContentInit(): void {
        this.columns.forEach((column) => {
            const data = CoreDataGridComponent.getDefaultData(column);
            this.columnFilterConfigs.set(column.headerName, {
                column: column,
                data: data,
                filter: CoreDataGridComponent.getColumnFilter(column, null)
            });
        });
        this.filter = this.getFilter();
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

    private getModel(column: CoreDataGridColumnDirective): any {
        const config = this.columnFilterConfigs.get(column.headerName);
        return config.data;
    }

    private showFilterEditor(column: CoreDataGridColumnDirective, popover: NgbPopover): boolean {
        popover.open();
        return false;
    }

    private closeFilterEditor(popover: NgbPopover): boolean {
        popover.close();
        return false;
    }

    private applyFilter(column: CoreDataGridColumnDirective, popover: NgbPopover): boolean {
        const config = this.columnFilterConfigs.get(column.headerName);
        config.filter = CoreDataGridComponent.getColumnFilter(column, config.data);
        this.filter = this.getFilter();
        popover.close();
        return false;
    }

    private getFilter(): FilterFunc {
        const filters: FilterFunc[] = [];
        this.columnFilterConfigs.forEach((config, headerName) => {
            filters.push(config.filter);
        });
        const filter = (value: any, index: number, array: any[]): boolean => {
            return filters.every((f) => f(value, index, array));
        };
        return filter;
    }

    private static getDefaultData(column: CoreDataGridColumnDirective): any {
        if (column.filter === "contains") {
            return { value: null };
        } else if (column.filter === "startsWith") {
            return { value: null };
        } else if (column.filter === "endsWith") {
            return { value: null };
        } else if (column.filter === "numberRange") {
            return { start: null, end: null };
        } else if (column.filter === "dateRange") {
            return { start: null, end: null };
        } else if (column.filter === "boolean") {
            return { value: null };
        } else {
            return null;
        }
    }

    private static getColumnFilter(column: CoreDataGridColumnDirective, data: any): FilterFunc {
        if (data === null) {
            return CoreDataGridComponent.getDefaultFilter();
        } else if (column.filter === "contains") {
            return CoreDataGridComponent.getContainsFilter(column, data.value);
        } else if (column.filter === "startsWith") {
            return CoreDataGridComponent.getStartsWithFilter(column, data.value);
        } else if (column.filter === "endsWith") {
            return CoreDataGridComponent.getEndsWithFilter(column, data.value);
        } else if (column.filter === "numberRange") {
            return CoreDataGridComponent.getNumberRangeFilter(column, data.start, data.end);
        } else if (column.filter === "dateRange") {
            return CoreDataGridComponent.getDateRangeFilter(column, data.start, data.end);
        } else if (column.filter === "boolean") {
            return CoreDataGridComponent.getBooleanFilter(column, data.value);
        } else {
            return CoreDataGridComponent.getDefaultFilter();
        }
    }

    private static getContainsFilter(column: CoreDataGridColumnDirective, value: string): FilterFunc {
        return (item) => {
            if (value === null) {
                return true;
            }
            if (!item) {
                return false;
            }
            const bound = item[column.bind];
            if (!bound) {
                return false;
            }
            const valueString = value.toString().toUpperCase();
            const boundString = bound.toString().toUpperCase();
            return boundString.includes(valueString);
        };
    }

    private static getStartsWithFilter(column: CoreDataGridColumnDirective, value: string): FilterFunc {
        return (item) => {
            if (value === null) {
                return true;
            }
            if (!item) {
                return false;
            }
            const bound = item[column.bind];
            if (!bound) {
                return false;
            }
            const valueString = value.toString().toUpperCase();
            const boundString = bound.toString().toUpperCase();
            return boundString.startsWith(valueString);
        };
    }

    private static getEndsWithFilter(column: CoreDataGridColumnDirective, value: string): FilterFunc {
        return (item) => {
            if (value === null) {
                return true;
            }
            if (!item) {
                return false;
            }
            const bound = item[column.bind];
            if (!bound) {
                return false;
            }
            const valueString = value.toString().toUpperCase();
            const boundString = bound.toString().toUpperCase();
            return boundString.endsWith(valueString);
        };
    }

    private static getNumberRangeFilter(
        column: CoreDataGridColumnDirective,
        start: number,
        end: number): FilterFunc {
        return (item) => {
            if (start === null && end === null) {
                return true;
            }
            if (!item) {
                return false;
            }
            const bound = item[column.bind];
            if (!bound || !(bound as number)) {
                return false;
            }
            if (start === null) {
                start = bound;
            }
            if (end === null) {
                end = bound;
            }
            return start <= bound && bound <= end;
        };
    }

    private static getDateRangeFilter(
        column: CoreDataGridColumnDirective,
        start: Date,
        end: Date): FilterFunc {
        return (item) => {
            if (start === null && end === null) {
                return true;
            }
            if (!item) {
                return false;
            }
            const bound = item[column.bind];
            if (!bound || !(bound as Date)) {
                return false;
            }
            if (start === null) {
                start = bound;
            }
            if (end === null) {
                end = bound;
            }
            return start <= bound && bound <= end;
        };
    }

    private static getBooleanFilter(column: CoreDataGridColumnDirective, value: boolean): FilterFunc {
        return (item) => {
            if (value === null) {
                return true;
            }
            if (!item) {
                return false;
            }
            const bound = item[column.bind];
            if (!bound || !(bound as boolean)) {
                return false;
            }
            return value === bound;
        };
    }

    private static getDefaultFilter(): FilterFunc {
        return (value: any, index: number, values: any[]): boolean => true;
    }

    private get filteredData(): any[] {
        return this.data.filter(this.filter);
    }
}
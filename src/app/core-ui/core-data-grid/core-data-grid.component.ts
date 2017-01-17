import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from "@angular/common";
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
    isFiltered: boolean;
    filter: FilterFunc;
}

export interface IDataGridFilterConfig {
    headerName: string;
    fieldName: string;
    filterType: string;
    data: any;
}

export interface IDataGridParameters {
    grid: CoreDataGridComponent;
    sortField: string;
    isSortDescending: boolean;
    page: number;
    pageSize: number;
    filters: IDataGridFilterConfig[]
}

@Component({
    selector: "core-data-grid",
    template: require("./core-data-grid.component.html")
})
export class CoreDataGridComponent implements AfterContentInit, OnInit {
    private data: any[] = null;
    private filteredData: any[] = [];
    private totalLength: number = 0;
    private columnFilterConfigs = new Map<string, IFilterConfig>();
    @Input() public isServerSide: boolean = false;
    @Input() public sortField: string = null;
    @Input() public isSortDescending: boolean = false;
    @ContentChildren(CoreDataGridColumnDirective) public columns: QueryList<CoreDataGridColumnDirective>;
    public page = 1;
    @Input() public pageSize: number = null;
    @Input() public pageSizes = [10, 25, 50, 100];
    @Output() public onInit = new EventEmitter<CoreDataGridComponent>();
    @Output() public dataRequested = new EventEmitter<IDataGridParameters>();

    constructor(
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe,
        private percentPipe: PercentPipe) {
    }

    public ngOnInit(): void {
        this.onInit.next(this);
    }

    public ngAfterContentInit(): void {
        this.columns.forEach((column) => {
            const data = CoreDataGridComponent.getDefaultData(column);
            this.columnFilterConfigs.set(column.headerName, {
                column: column,
                data: data,
                filter: CoreDataGridComponent.getColumnFilter(column, null),
                isFiltered: false
            });
        });
        this.refresh();
    }

    public setData(data: any[], totalLength?: number): void {
        this.data = data;
        this.totalLength = (!this.isServerSide || typeof totalLength === "undefined")
            ? (data === null)
                ? 0
                : data.length
            : Math.max(totalLength, 0);
        this.applyChanges();
    }

    private sortBy(column: CoreDataGridColumnDirective): boolean {
        if (!column.isSortable) {
            return false;
        }
        if (this.sortField === column.bind) {
            this.isSortDescending = !this.isSortDescending;
        } else {
            this.sortField = column.bind;
            this.isSortDescending = false;
        }
        this.refresh();
        return false;
    }

    private getModel(column: CoreDataGridColumnDirective): any {
        const config = this.columnFilterConfigs.get(column.headerName);
        return config.data;
    }

    private showFilterEditor(popover: NgbPopover): boolean {
        popover.toggle();
        return false;
    }

    private closeFilterEditor(popover: NgbPopover): boolean {
        popover.close();
        return false;
    }

    private applyFilter(column: CoreDataGridColumnDirective, isFiltered: boolean, popover: NgbPopover): boolean {
        const config = this.columnFilterConfigs.get(column.headerName);
        config.isFiltered = isFiltered;
        if (isFiltered) {
            config.filter = CoreDataGridComponent.getColumnFilter(column, config.data);
        } else {
            config.data = CoreDataGridComponent.getDefaultData(column);
            config.filter = CoreDataGridComponent.getDefaultFilter();
        }
        this.refresh();
        popover.close();
        return false;
    }

    private isFiltered(column: CoreDataGridColumnDirective): boolean {
        const config = this.columnFilterConfigs.get(column.headerName);
        return config.isFiltered;
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
            if (!item || !(column.bind in item)) {
                return false;
            }
            const bound = item[column.bind];
            if (bound === null) {
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
            if (!item || !(column.bind in item)) {
                return false;
            }
            const bound = item[column.bind];
            if (bound === null) {
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
            if (!item || !(column.bind in item)) {
                return false;
            }
            const bound = item[column.bind];
            if (bound === null) {
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
            if (!item || !(column.bind in item)) {
                return false;
            }
            const bound = item[column.bind];
            if (bound === null || typeof bound !== "number") {
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
            if (!item || !(column.bind in item)) {
                return false;
            }
            const bound = item[column.bind];
            if (bound === null || !(bound instanceof Date)) {
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
            if (!item || !(column.bind in item)) {
                return false;
            }
            const bound = item[column.bind];
            if (typeof bound !== "boolean") {
                return false;
            }
            return value === bound;
        };
    }

    private static getDefaultFilter(): FilterFunc {
        return (value: any, index: number, values: any[]): boolean => true;
    }

    private getValue(row: any, column: CoreDataGridColumnDirective): any {
        const value = row[column.bind];
        if (value instanceof Date && !!column.dateFormat) {
            return this.datePipe.transform(value, column.dateFormat);
        } else if (typeof value === "number") {
            if (!!column.currencyFormat) {
                return this.currencyPipe.transform(value, column.currencyFormat, true, "1.2-2");
            } else if (!!column.percentFormat) {
                return this.percentPipe.transform(value, column.percentFormat);
            } else if (!!column.decimalFormat) {
                return this.decimalPipe.transform(value, column.decimalFormat);
            }
        }
        return value;
    }

    private changePage(page: number): void {
        this.page = page;
        if (this.isServerSide) {
            this.refresh();
        }
    }

    private changePageSize(pageSize: number): void {
        this.pageSize = pageSize;
        const maxPages = Math.trunc(this.totalLength / this.pageSize) + 1;
        if (this.page > maxPages) {
            this.page = maxPages;
        }
        if (this.isServerSide) {
            this.refresh();
        }
    }

    public reset(): void {
        this.sortField = null;
        this.isSortDescending = false;
        this.page = 1;
        this.columns.forEach((column) => {
            const config = this.columnFilterConfigs.get(column.headerName);
            config.isFiltered = false;
            config.data = CoreDataGridComponent.getDefaultData(column);
            config.filter = CoreDataGridComponent.getDefaultFilter();
        });
        this.refresh();
    }

    private refresh(): void {
        if (this.isServerSide) {
            const filterConfigs: IDataGridFilterConfig[] = [];
            this.columnFilterConfigs.forEach((config) => {
                const filterConfig: IDataGridFilterConfig = {
                    data: config.data,
                    fieldName: config.column.bind,
                    filterType: config.column.filter,
                    headerName: config.column.headerName
                };
                filterConfigs.push(filterConfig);
            });
            const parameters: IDataGridParameters = {
                filters: filterConfigs,
                grid: this,
                isSortDescending: this.isSortDescending,
                page: this.page,
                pageSize: this.pageSize,
                sortField: this.sortField
            };
            this.dataRequested.next(parameters);
        } else {
            this.applyChanges();
        }
    }

    private applyChanges(): void {
        if (this.data === null) {
            this.filteredData = [];
            return;
        }
        if (this.isServerSide) {
            this.filteredData = this.data;
        } else {
            const filter = this.getFilter();
            this.filteredData = this.data.filter(filter);
        }
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
}

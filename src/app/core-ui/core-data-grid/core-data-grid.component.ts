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
    @ContentChildren(CoreDataGridColumnDirective) public columns: CoreDataGridColumnDirective;
    @Input() public data: any[];
    @Output() public onInit = new EventEmitter<CoreDataGridComponent>();

    public ngOnInit(): void {
        this.onInit.next(this);
    }
}

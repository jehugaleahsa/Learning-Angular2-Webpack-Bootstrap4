import { Component } from "@angular/core";

import { CoreDataGridComponent } from "../core-ui/core-data-grid/core-data-grid.component";

import "./data-grid-demo.component.scss";

@Component({
    template: require("./data-grid-demo.component.html")
})
export class DataGridDemoComponent {
    public getData(grid: CoreDataGridComponent): void {
        grid.data = [
            { firstName: "John", lastName: "Smith", email: "jsmith@x.com", phone: "(555) 555-5555", age: 43 },
            { firstName: "Jane", lastName: "Doe", email: "jdoe@x.com", phone: "(555) 555-5555", age: 28 }
        ];
    }
}

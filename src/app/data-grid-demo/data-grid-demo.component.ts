import { Component } from "@angular/core";

import { CoreDataGridComponent } from "../core-ui/core-data-grid/core-data-grid.component";

import "./data-grid-demo.component.scss";

@Component({
    template: require("./data-grid-demo.component.html")
})
export class DataGridDemoComponent {
    public getData(grid: CoreDataGridComponent): void {
        grid.data = [
            {
                createdOn: new Date(2017, 0, 12),
                email: "jsmith@x.com",
                firstName: "John",
                isActive: true,
                lastName: "Smith",
                phone: "(555) 555-5555",
                rate: 43.01
            },
            {
                createdOn: new Date(2016, 11, 13),
                email: "jdoe@x.com",
                firstName: "Jane",
                isActive: false,
                lastName: "Doe",
                phone: "(555) 444-4444",
                rate: 28.16
            }
        ];
    }
}

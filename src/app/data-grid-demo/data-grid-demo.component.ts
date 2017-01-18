import { Component, ViewChild } from "@angular/core";

import {
    CoreDataGridComponent,
    IDataGridParameters
} from "../core-ui/core-data-grid/core-data-grid.component";

import "./data-grid-demo.component.scss";

const data = [
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
    },
    {
        createdOn: new Date(2011, 0, 11),
        email: "izzy.parks@x.com",
        firstName: "Isabeau",
        isActive: true,
        lastName: "Parks",
        phone: "(555) 123-4567",
        rate: 59.11
    },
    {
        createdOn: new Date(2011, 4, 19),
        email: "avie@x.com",
        firstName: "Avie",
        isActive: true,
        lastName: "Pumpkin",
        phone: "(555) 345-0001",
        rate: 18.03
    },
    {
        createdOn: new Date(1984, 10, 3),
        email: "hlimpet@x.com",
        firstName: "Harold",
        isActive: true,
        lastName: "Limpet",
        phone: "(555) 888-4443",
        rate: 11.11
    },
    {
        createdOn: new Date(1978, 3, 28),
        email: "sweine@x.com",
        firstName: "Sheryl",
        isActive: false,
        lastName: "Weine",
        phone: "(555) 765-4598",
        rate: 78.56
    },
    {
        createdOn: new Date(1945, 4, 5),
        email: "dlionel@x.com",
        firstName: "David",
        isActive: true,
        lastName: "Lionel",
        phone: "(555) 897-0654",
        rate: 15.43
    },
    {
        createdOn: new Date(1964, 6, 7),
        email: "shammer@x.com",
        firstName: "Steve",
        isActive: true,
        lastName: "Hammer",
        phone: "(555) 456-0008",
        rate: 112.08
    },
    {
        createdOn: new Date(1978, 9, 11),
        email: "tpetry@x.com",
        firstName: "Tyler",
        isActive: false,
        lastName: "Petry",
        phone: "(555) 111-2222",
        rate: 45.23
    },
    {
        createdOn: new Date(1965, 6, 21),
        email: "ajalice@x.com",
        firstName: "Alice",
        isActive: true,
        lastName: "Jalice",
        phone: "(555) 222-3456",
        rate: 56.11
    },
    {
        createdOn: new Date(1999, 11, 31),
        email: "rjohnson@x.com",
        firstName: "Robert",
        isActive: false,
        lastName: "Johnson",
        phone: "(555) 456-8887",
        rate: 45.89
    }
];

@Component({
    template: require("./data-grid-demo.component.html")
})
export class DataGridDemoComponent {
    @ViewChild(CoreDataGridComponent) private grid: CoreDataGridComponent;

    public getClientSideData(grid: CoreDataGridComponent): void {
        grid.setData(data);
    }

    private reset(): boolean {
        this.grid.reset();
        return false;
    }

    private getServerData(parameters: IDataGridParameters): void {
        const startIndex = parameters.pageSize * (parameters.page - 1);
        const endIndex = Math.min(startIndex + parameters.pageSize, data.length);
        const page = data.slice(startIndex, endIndex);
        parameters.grid.setData(page, data.length);
    }
}

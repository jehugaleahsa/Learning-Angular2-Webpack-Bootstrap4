import { Component, ViewChild } from "@angular/core";

import {
    CoreCollapsiblePanelComponent
} from "../core-ui/core-collapsible-panel/core-collapsible-panel.component";
import {
    IFilterOption
} from "../core-ui/core-data-grid/core-data-grid-option-filter/core-data-grid-option-filter.component";
import {
    CoreDataGridComponent,
    IDataGridExport,
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
        pet: 0,
        phone: "(555) 555-5555",
        rate: 43.01
    },
    {
        createdOn: new Date(2016, 11, 13),
        email: "jdoe@x.com",
        firstName: "Jane",
        isActive: false,
        lastName: "Doe",
        pet: 1,
        phone: "(555) 444-4444",
        rate: 28.16
    },
    {
        createdOn: new Date(2011, 0, 11),
        email: "izzy.parks@x.com",
        firstName: "Isabeau",
        isActive: true,
        lastName: "Parks",
        pet: 1,
        phone: "(555) 123-4567",
        rate: 59.11
    },
    {
        createdOn: new Date(2011, 4, 19),
        email: "avie@x.com",
        firstName: "Avie",
        isActive: true,
        lastName: "Pumpkin",
        pet: 2,
        phone: "(555) 345-0001",
        rate: 18.03
    },
    {
        createdOn: new Date(1984, 10, 3),
        email: "hlimpet@x.com",
        firstName: "Harold",
        isActive: true,
        lastName: "Limpet",
        pet: 3,
        phone: "(555) 888-4443",
        rate: 11.11
    },
    {
        createdOn: new Date(1978, 3, 28),
        email: "sweine@x.com",
        firstName: "Sheryl",
        isActive: false,
        lastName: "Weine",
        pet: 4,
        phone: "(555) 765-4598",
        rate: 78.56
    },
    {
        createdOn: new Date(1945, 4, 5),
        email: "dlionel@x.com",
        firstName: "David",
        isActive: true,
        lastName: "Lionel",
        pet: 5,
        phone: "(555) 897-0654",
        rate: 15.43
    },
    {
        createdOn: new Date(1964, 6, 7),
        email: "shammer@x.com",
        firstName: "Steve",
        isActive: true,
        lastName: "Hammer",
        pet: 0,
        phone: "(555) 456-0008",
        rate: 112.08
    },
    {
        createdOn: new Date(1978, 9, 11),
        email: "tpetry@x.com",
        firstName: "Tyler",
        isActive: false,
        lastName: "Petry",
        pet: 1,
        phone: "(555) 111-2222",
        rate: 45.23
    },
    {
        createdOn: new Date(1965, 6, 21),
        email: "ajalice@x.com",
        firstName: "Alice",
        isActive: true,
        lastName: "Jalice",
        pet: 2,
        phone: "(555) 222-3456",
        rate: 56.11
    },
    {
        createdOn: new Date(1999, 11, 31),
        email: "rjohnson@x.com",
        firstName: "Robert",
        isActive: false,
        lastName: "Johnson",
        pet: 3,
        phone: "(555) 456-8887",
        rate: 45.89
    }
];

@Component({
    template: require("./data-grid-demo.component.html")
})
export class DataGridDemoComponent {
    @ViewChild(CoreDataGridComponent) private grid: CoreDataGridComponent;
    @ViewChild(CoreCollapsiblePanelComponent) private exportPanel: CoreCollapsiblePanelComponent;
    private exported: any = null;

    public getClientSideData(grid: CoreDataGridComponent): void {
        grid.setData(data);
    }

    private reset(): boolean {
        this.grid.reset();
        return false;
    }

    private export(): boolean {
        const { data: exportData, parameters: parameters } = this.grid.export();
        delete parameters.grid;
        this.exported = { parameters: parameters, data: exportData };
        this.exportPanel.isOpen = true;
        return false;
    }

    private getServerData(parameters: IDataGridParameters): void {
        const startIndex = parameters.pageSize * (parameters.page - 1);
        const endIndex = Math.min(startIndex + parameters.pageSize, data.length);
        const page = data.slice(startIndex, endIndex);
        parameters.grid.setData(page, data.length);
    }

    private petOptions: IFilterOption[] = [
        { value: 0, description: "Dog" },
        { value: 1, description: "Cat" },
        { value: 2, description: "Bird" },
        { value: 3, description: "Lizard" },
        { value: 4, description: "Hampster" },
        { value: 5, description: "Fish" },
        { value: 6, description: "Pony" },
        { value: 7, description: "Ferret" },
        { value: 8, description: "Ants" }
    ];

    private getPetDescription(value: number): string {
        const option = this.petOptions.find((o) => o.value === value);
        return option ? option.description : "None";
    }
}

import { Routes } from "@angular/router";

import { CollapsiblePanelDemoComponent } from "./collaspible-panel-demo/collapsible-panel-demo.component";
import { DataGridDemoComponent } from "./data-grid-demo/data-grid-demo.component";
import { DatePickerDemoComponent } from "./date-picker-demo/date-picker-demo.component";
import { FormsDemoComponent } from "./form-demo/form-demo.component";
import { HomeComponent } from "./home/home.component";
import { ModalDemoComponent } from "./modal-demo/modal-demo.component";
import { PanelDemoComponent } from "./panel-demo/panel-demo.component";
import { SpinnerDemoComponent } from "./spinner-demo/spinner-demo.component";

export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "date-picker-demo", redirectTo: "/home/(tabs:date-picker-demo)", pathMatch: "full" },
    { path: "panel-demo", redirectTo: "/home/(tabs:panel-demo)", pathMatch: "full" },
    { path: "collapsible-panel-demo", redirectTo: "/home/(tabs:collapsible-panel-demo)", pathMatch: "full" },
    { path: "spinner-demo", redirectTo: "/home/(tabs:spinner-demo)", pathMatch: "full" },
    { path: "modal-demo", redirectTo: "/home/(tabs:modal-demo)", pathMatch: "full" },
    { path: "data-grid-demo", redirectTo: "/home/(tabs:data-grid-demo)", pathMatch: "full" },
    { path: "forms-demo", redirectTo: "/home/(tabs:forms-demo)", pathMatch: "full" },
    {
        children: [
            { path: "date-picker-demo", component: DatePickerDemoComponent, outlet: "tabs" },
            { path: "panel-demo", component: PanelDemoComponent, outlet: "tabs" },
            { path: "collapsible-panel-demo", component: CollapsiblePanelDemoComponent, outlet: "tabs" },
            { path: "spinner-demo", component: SpinnerDemoComponent, outlet: "tabs" },
            { path: "modal-demo", component: ModalDemoComponent, outlet: "tabs" },
            { path: "data-grid-demo", component: DataGridDemoComponent, outlet: "tabs" },
            { path: "forms-demo", component: FormsDemoComponent, outlet: "tabs" }
        ],
        component: HomeComponent,
        path: "home"
    }
];

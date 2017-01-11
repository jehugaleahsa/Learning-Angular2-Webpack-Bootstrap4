import { Routes } from "@angular/router";

import { CollapsiblePanelDemoComponent } from "./collaspible-panel-demo/collapsible-panel-demo.component";
import { DatePickerDemoComponent } from "./date-picker-demo/date-picker-demo.component";
import { HomeComponent } from "./home/home.component";
import { PanelDemoComponent } from "./panel-demo/panel-demo.component";
import { SpinnerDemoComponent } from "./spinner-demo/spinner-demo.component";

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "date-picker-demo", component: DatePickerDemoComponent },
    { path: "panel-demo", component: PanelDemoComponent },
    { path: "collapsible-panel-demo", component: CollapsiblePanelDemoComponent },
    { path: "spinner-demo", component: SpinnerDemoComponent }
];

import {
    APP_BASE_HREF,
    CommonModule,
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy
} from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { AppSettings } from "./app.settings";
import { CollapsiblePanelDemoComponent } from "./collaspible-panel-demo/collapsible-panel-demo.component";
import { CoreUIModule } from "./core-ui/core-ui.module";
import { DataGridDemoComponent } from "./data-grid-demo/data-grid-demo.component";
import { DatePickerDemoComponent } from "./date-picker-demo/date-picker-demo.component";
import { HomeComponent } from "./home/home.component";
import { ModalDemoComponent } from "./modal-demo/modal-demo.component";
import { PanelDemoComponent } from "./panel-demo/panel-demo.component";
import { SpinnerDemoComponent } from "./spinner-demo/spinner-demo.component";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CollapsiblePanelDemoComponent,
    DataGridDemoComponent,
    DatePickerDemoComponent,
    HomeComponent,
    ModalDemoComponent,
    PanelDemoComponent,
    SpinnerDemoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule.forRoot(),
    CoreUIModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: AppSettings.baseHref },
    { provide: LocationStrategy, useClass: PathLocationStrategy  }
  ]
})
export class AppModule { }

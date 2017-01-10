import {
    APP_BASE_HREF,
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
import { DatePickerDemoComponent } from "./date-picker-demo/date-picker-demo.component";
import { HomeComponent } from "./home/home.component";
import { PanelDemoComponent } from "./panel-demo/panel-demo.component";

const locationStrategy = HashLocationStrategy;

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CollapsiblePanelDemoComponent,
    DatePickerDemoComponent,
    HomeComponent,
    PanelDemoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    CoreUIModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: AppSettings.baseHref },
    { provide: LocationStrategy, useClass: locationStrategy  }
  ]
})
export class AppModule { }

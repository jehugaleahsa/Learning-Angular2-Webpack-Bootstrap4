import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FadingCircleComponent } from "ng-spin-kit";

import { ControlStatus } from "./control-status";
import { CoreAlertModalComponent } from "./core-alert-modal/core-alert-modal.component";
import { CoreCollapsiblePanelComponent } from "./core-collapsible-panel/core-collapsible-panel.component";
import { CoreConfirmationModalComponent } from "./core-confirmation-modal/core-confirmation-modal.component";
import { CoreDataGridColumnDirective } from "./core-data-grid/core-data-grid-column.directive";
import { CoreDataGridComponent } from "./core-data-grid/core-data-grid.component";
import { CoreDatePickerComponent } from "./core-date-picker/core-date-picker.component";
import { CoreDatePickerParserFormatter } from "./core-date-picker/core-date-picker.parserformatter";
import { CorePanelComponent } from "./core-panel/core-panel.component";
import { CoreRoutingTabTitleDirective } from "./core-routing-tabset/core-routing-tab-title.directive";
import { CoreRoutingTabDirective } from "./core-routing-tabset/core-routing-tab.directive";
import { CoreRoutingTabsetComponent } from "./core-routing-tabset/core-routing-tabset.component";
import { CoreSpinnerModalComponent } from "./core-spinner-modal/core-spinner-modal.component";
import { CoreSpinnerComponent } from "./core-spinner/core-spinner.component";

@NgModule({
    declarations: [
        CoreAlertModalComponent,
        CoreCollapsiblePanelComponent,
        CoreConfirmationModalComponent,
        CoreDataGridColumnDirective,
        CoreDataGridComponent,
        CoreDatePickerComponent,
        CorePanelComponent,
        CoreRoutingTabTitleDirective,
        CoreRoutingTabDirective,
        CoreRoutingTabsetComponent,
        CoreSpinnerComponent,
        CoreSpinnerModalComponent,
        FadingCircleComponent
    ],
    exports: [
        CoreAlertModalComponent,
        CoreCollapsiblePanelComponent,
        CoreConfirmationModalComponent,
        CoreDataGridColumnDirective,
        CoreDataGridComponent,
        CoreDatePickerComponent,
        CorePanelComponent,
        CoreRoutingTabTitleDirective,
        CoreRoutingTabDirective,
        CoreRoutingTabsetComponent,
        CoreSpinnerComponent,
        CoreSpinnerModalComponent
    ],
    imports: [ NgbModule, CommonModule, FormsModule, RouterModule ],
    providers: [
        {
            provide: NgbDateParserFormatter,
            useFactory: () => new CoreDatePickerParserFormatter("MM/DD/YYYY")
        }
    ]
})
export class CoreUIModule {
}

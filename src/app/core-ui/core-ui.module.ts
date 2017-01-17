import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FadingCircleComponent } from "ng-spin-kit";

import { CoreAlertModalComponent } from "./core-alert-modal/core-alert-modal.component";
import { CoreCollapsiblePanelComponent } from "./core-collapsible-panel/core-collapsible-panel.component";
import { CoreConfirmationModalComponent } from "./core-confirmation-modal/core-confirmation-modal.component";
import {
    CoreDataGridBooleanFilterComponent
} from "./core-data-grid/core-data-grid-boolean-filter/core-data-grid-boolean-filter.component";
import { CoreDataGridColumnDirective } from "./core-data-grid/core-data-grid-column.directive";
import {
    CoreDataGridContainsFilterComponent
} from "./core-data-grid/core-data-grid-contains-filter/core-data-grid-contains-filter.component";
import {
    CoreDataGridDateRangeFilterComponent
} from "./core-data-grid/core-data-grid-date-range-filter/core-data-grid-date-range-filter.component";
import {
    CoreDataGridEndsWithFilterComponent
} from "./core-data-grid/core-data-grid-ends-with-filter/core-data-grid-ends-with-filter.component";
import {
    CoreDataGridNumberRangeFilterComponent
} from "./core-data-grid/core-data-grid-number-range-filter/core-data-grid-number-range-filter.component";
import {
    CoreDataGridStartsWithFilterComponent
} from "./core-data-grid/core-data-grid-starts-with-filter/core-data-grid-starts-with-filter.component";
import { CoreDataGridComponent } from "./core-data-grid/core-data-grid.component";
import { OrderByPipe } from "./core-data-grid/order-by.pipe";
import { PageByPipe } from "./core-data-grid/page-by.pipe";
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
        CoreDataGridBooleanFilterComponent,
        CoreDataGridContainsFilterComponent,
        CoreDataGridDateRangeFilterComponent,
        CoreDataGridEndsWithFilterComponent,
        CoreDataGridNumberRangeFilterComponent,
        CoreDataGridStartsWithFilterComponent,
        CoreDatePickerComponent,
        CorePanelComponent,
        CoreRoutingTabTitleDirective,
        CoreRoutingTabDirective,
        CoreRoutingTabsetComponent,
        CoreSpinnerComponent,
        CoreSpinnerModalComponent,
        FadingCircleComponent,
        OrderByPipe,
        PageByPipe
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
        },
        CurrencyPipe, DatePipe, DecimalPipe, OrderByPipe, PageByPipe, PercentPipe
    ]
})
export class CoreUIModule {
}

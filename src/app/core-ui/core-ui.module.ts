import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FadingCircleComponent } from "ng-spin-kit";

import { ControlStatus } from "./control-status";
import { CoreCollapsiblePanelComponent } from "./core-collapsible-panel/core-collapsible-panel.component";
import { CoreDatePickerComponent } from "./core-date-picker/core-date-picker.component";
import { CoreDatePickerParserFormatter } from "./core-date-picker/core-date-picker.parserformatter";
import { CorePanelComponent } from "./core-panel/core-panel.component";
import { CoreSpinnerModalComponent } from "./core-spinner-modal/core-spinner-modal.component";
import { CoreSpinnerComponent } from "./core-spinner/core-spinner.component";

@NgModule({
    declarations: [
        CoreCollapsiblePanelComponent,
        CoreDatePickerComponent,
        CorePanelComponent,
        CoreSpinnerComponent,
        CoreSpinnerModalComponent,
        FadingCircleComponent
    ],
    exports: [
        CoreCollapsiblePanelComponent,
        CoreDatePickerComponent,
        CorePanelComponent,
        CoreSpinnerComponent,
        CoreSpinnerModalComponent
    ],
    imports: [ NgbModule, CommonModule, FormsModule ],
    providers: [
        {
            provide: NgbDateParserFormatter,
            useFactory: () => new CoreDatePickerParserFormatter("MM/DD/YYYY")
        }
    ]
})
export class CoreUIModule {
}

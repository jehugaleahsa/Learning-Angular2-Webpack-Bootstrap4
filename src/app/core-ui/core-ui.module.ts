import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCollapsiblePanelComponent } from "./core-collapsible-panel/core-collapsible-panel.component";
import { CoreDatePickerComponent } from "./core-date-picker/core-date-picker.component";
import { CoreDatePickerParserFormatter } from "./core-date-picker/core-date-picker.parserformatter";
import { CorePanelComponent } from "./core-panel/core-panel.component";

@NgModule({
    declarations: [ CoreCollapsiblePanelComponent, CoreDatePickerComponent, CorePanelComponent ],
    exports: [ CoreCollapsiblePanelComponent, CoreDatePickerComponent, CorePanelComponent ],
    imports: [ NgbModule, CommonModule, FormsModule ],
    providers: [
        {
            provide: NgbDateParserFormatter,
            useFactory: () => new CoreDatePickerParserFormatter("MM/DD/YYYY")
        }
    ]
})
export class CoreUIModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CorePanelComponent } from "./core-panel/core-panel.component";

@NgModule({
    declarations: [ CorePanelComponent ],
    exports: [ CorePanelComponent ],
    imports: [ NgbModule, CommonModule ]
})
export class CoreUIModule { }

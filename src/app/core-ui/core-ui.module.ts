import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCollapsiblePanelComponent } from "./core-collapsible-panel/core-collapsible-panel.component";
import { CorePanelComponent } from "./core-panel/core-panel.component";

@NgModule({
    declarations: [ CoreCollapsiblePanelComponent, CorePanelComponent ],
    exports: [ CoreCollapsiblePanelComponent, CorePanelComponent ],
    imports: [ NgbModule, CommonModule ]
})
export class CoreUIModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MyPanelComponent } from "./my-panel/my-panel.component";

@NgModule({
    declarations: [ MyPanelComponent ],
    exports: [ MyPanelComponent ],
    imports: [ NgbModule, CommonModule ]
})
export class MyUIModule { }

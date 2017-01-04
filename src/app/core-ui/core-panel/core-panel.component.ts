import { Component, Input } from "@angular/core";

import "bootstrap/dist/css/bootstrap.css";

@Component({
    selector: "core-panel",
    template: require("./core-panel.component.html")
})
export class CorePanelComponent {
    @Input() public iconClass: String;
    @Input() public title: String;
}

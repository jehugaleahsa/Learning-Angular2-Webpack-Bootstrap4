import { Component, Input } from "@angular/core";

import "./core-panel.component.scss";

@Component({
    selector: "core-panel",
    template: require("./core-panel.component.html")
})
export class CorePanelComponent {
    @Input() public iconClass: String;
    @Input() public title: String;
}

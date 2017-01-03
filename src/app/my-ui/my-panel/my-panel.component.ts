import { Component, Input } from "@angular/core";

import "bootstrap/dist/css/bootstrap.css";

@Component({
    selector: "my-panel",
    template: require("./my-panel.component.html")
})
export class MyPanelComponent {
    @Input() public iconClass: String;
    @Input() public title: String;
}

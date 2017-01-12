import { ContentChild, Directive, Input } from "@angular/core";

import { CoreRoutingTabTitleDirective } from "./core-routing-tab-title.directive";

@Directive({
    selector: "core-routing-tab"
})
export class CoreRoutingTabDirective {
    @ContentChild(CoreRoutingTabTitleDirective) public titleTemplate: CoreRoutingTabTitleDirective;

    @Input() public title: string;

    @Input() public isActive: boolean;

    @Input() public route: any[] | string;
}

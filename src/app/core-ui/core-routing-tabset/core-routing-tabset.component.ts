import {
    AfterContentChecked,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    Renderer,
    ViewChild
} from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";

import { CoreRoutingTabDirective } from "./core-routing-tab.directive";

import "./core-routing-tabset.component.scss";

@Component({
    selector: "core-routing-tabset",
    template: require("./core-routing-tabset.component.html")
})
export class CoreRoutingTabsetComponent implements AfterContentChecked, OnInit {
    //@ViewChild("outletPlaceholder") private placeholder: ElementRef;
    @ContentChildren(CoreRoutingTabDirective) public tabs: QueryList<CoreRoutingTabDirective>;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private renderer: Renderer) {
    }

    @Input() public outletName: string;

    public ngOnInit() {
        //const outlet = this.renderer.createElement(this.placeholder.nativeElement, "router-outlet");
        //this.renderer.setElementAttribute(outlet, "name", this.outletName);
    }

    public ngAfterContentChecked(): void {
        const hasActive = this.tabs.filter((t) => t.isActive).length > 0;
        if (!hasActive) {
            const first = this.tabs.first;
            this.navigateToTab(first);
        }
    }

    private selectTab(tab: CoreRoutingTabDirective): boolean {
        this.tabs.filter((t) => t.isActive).forEach((t) => t.isActive = false);
        this.navigateToTab(tab);
        return false;
    }

    private navigateToTab(tab: CoreRoutingTabDirective): void {
        tab.isActive = true;
        const route = this.decorateRoute(tab.route);
        this.router.navigate(route, { relativeTo: this.activeRoute });
    }

    private decorateRoute(route: any[] | string): any[] {
        return [
            {
                outlets: { [this.outletName]: route }
            }
        ];
    }
}

import {
    AfterContentChecked,
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
    ViewChild
} from "@angular/core";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Event as RouterEvent,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterOutlet,
    RouterOutletMap,
    UrlSegment
} from "@angular/router";

import { CoreRoutingTabDirective } from "./core-routing-tab.directive";

import "./core-routing-tabset.component.scss";

@Component({
    selector: "core-routing-tabset",
    template: require("./core-routing-tabset.component.html")
})
export class CoreRoutingTabsetComponent implements AfterContentChecked, OnInit {
    private initialRoute: any[] = null;
    @ViewChild(RouterOutlet) private outlet: RouterOutlet;
    @ContentChildren(CoreRoutingTabDirective) public tabs: QueryList<CoreRoutingTabDirective>;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private outletMap: RouterOutletMap) {
    }

    @Input() public outletName: string;

    public ngOnInit() {
        this.outletMap.registerOutlet(this.outletName, this.outlet);
        const activeChildren = this.activeRoute.snapshot.children.filter((c) => c.outlet === this.outletName);
        if (activeChildren.length !== 0) {
            const activeChild = activeChildren[0];
            if (activeChild.url.length !== 0) {
                const path = activeChild.url[0].path;
                this.initialRoute = this.decorateRoute([path]);
            }
        }
    }

    public ngAfterContentChecked(): void {
        if (this.initialRoute !== null) {
            this.navigateToRoute(this.initialRoute);
            this.initialRoute = null;
            return;
        }
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
        this.navigateToRoute(route);
    }

    private decorateRoute(route: any[] | string): any[] {
        return [
            {
                outlets: { [this.outletName]: route }
            }
        ];
    }

    private navigateToRoute(route: any[]): void {
        this.router.navigate(route, { relativeTo: this.activeRoute });
    }
}

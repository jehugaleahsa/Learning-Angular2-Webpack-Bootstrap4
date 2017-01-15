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
    private _initialPath: string = null;
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
        this._initialPath = this.getInitialPath();
    }

    private getInitialPath(): string {
        if (!this.activeRoute.snapshot.children) {
            return null;
        }
        const activeChildren = this.activeRoute.snapshot.children.filter((c) => c.outlet === this.outletName);
        if (activeChildren.length === 0) {
            return null;
        }
        const activeChild = activeChildren[0];
        if (activeChild.url.length === 0) {
            return null;
        }
        const path = activeChild.url[0].path;
        return path;
    }

    public ngAfterContentChecked(): void {
        if (this._initialPath !== null) {
            this.tabs
                .filter((tab) => CoreRoutingTabsetComponent.isRouteMatch(tab, this._initialPath))
                .forEach((tab) => tab.isActive = true);
            this._initialPath = null;
        } else if (this.tabs.length !== 0 && this.tabs.filter((tab) => tab.isActive).length === 0) {
            const firstTab = this.tabs.first;
            this.navigateToTab(firstTab);
        }
    }

    private static isRouteMatch(tab: CoreRoutingTabDirective, value: string): boolean {
        if (typeof tab.route === "string") {
            return tab.route === value;
        } else {
            return tab.route[0] === value;
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

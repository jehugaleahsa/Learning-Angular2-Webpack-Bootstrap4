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
    Event as RouterEvent,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterOutlet,
    RouterOutletMap
} from "@angular/router";

import { CoreRoutingTabDirective } from "./core-routing-tab.directive";

import "./core-routing-tabset.component.scss";

@Component({
    selector: "core-routing-tabset",
    template: require("./core-routing-tabset.component.html")
})
export class CoreRoutingTabsetComponent implements AfterContentChecked, OnInit {
    private isLoading: boolean = false;
    @ViewChild(RouterOutlet) private outlet: RouterOutlet;
    @ContentChildren(CoreRoutingTabDirective) public tabs: QueryList<CoreRoutingTabDirective>;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private outletMap: RouterOutletMap) {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                this.isLoading = true;
            } else if (event instanceof NavigationEnd) {
                this.isLoading = false;
            } else if (event instanceof NavigationCancel) {
                this.isLoading = false;
            } else if (event instanceof NavigationError) {
                this.isLoading = false;
            }
        });
    }

    @Input() public outletName: string;

    public ngOnInit() {
        this.outletMap.registerOutlet(this.outletName, this.outlet);
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

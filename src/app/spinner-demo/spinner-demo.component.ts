import { Component } from "@angular/core";

import "./spinner-demo.component.scss";

@Component({
    template: require("./spinner-demo.component.html")
})
export class SpinnerDemoComponent {
    private _isModalOpen: boolean = false;

    public openModal(): void {
        this._isModalOpen = true;
        setTimeout(() => this._isModalOpen = false, 2500);
    }
}

import { Component } from '@angular/core';

@Component({
    selector: 'sample-app',
    template: `<div>Hello, {{name}}</div>`
})
export class AppComponent {
    name = 'Dave'
 }
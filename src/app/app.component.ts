import { Component } from '@angular/core';

@Component({
    selector: 'sample-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})
export class AppComponent {
    name = 'Dave'
}
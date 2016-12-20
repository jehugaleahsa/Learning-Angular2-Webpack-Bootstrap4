import { Component } from '@angular/core';

@Component({
    selector: 'sample-app',
    template: require('../assets/templates/app.component.html'),
    styles: [require('../assets/styles/app.component.scss')]
})
export class AppComponent {
    name = 'Dave'
}
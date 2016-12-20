import { Component } from '@angular/core';

@Component({
    selector: 'sample-app',
    template: require('../assets/templates/app.component.html')
})
export class AppComponent {
    name = 'Dave'
}
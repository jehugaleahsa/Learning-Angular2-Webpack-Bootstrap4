# Learning Angular 2, Webpack and Bootstrap 4
A test project to help me learn Angular 2, Webpack 2 and Bootstrap 4.

## Setup Instructions
* Install all npm dependencies (`npm install`)

## Run Instructions
* Kick off webpack dev server (`npm run start`)
* View in browser (`http://localhost:8080/`)

## Fun stuff...
So, a big part of creating this project was to learn how to setup an Angular 2 development environment. I think with my digging into Webpack 2 and the plethora of other tools, that phase is complete. I feel pretty confident that, outside of testing, my build process generates production-grade build output. I gave up on supporting Angular 2 Ahead-of-time compilation (AOT) since there seem to be verioning conflicts with various tools.

I have since moved on to building up a suite of reusable UI components, as well as a simple web site that demonstrates them.

So far I have built:
- A simple panel that makes it easy to apply bootstrap colors (success, warning, danger, etc.).
- A collapsible panel that allows inner content to be collapsed, supporting bootstrap colors again.
- A simple wrapper around ng-bootstrap's DatePicker component to make it easier to bind to JavaScript `Date`s.
- A spinner and a spinner modal (to be used as a loading indicator).
- A confirmation modal (OK/Cancel) that uses RxJS `Observable`s to incorporate user feedback into promise/observable chain.
- An alert modal with observable behavior again.
- A tabset control that works with Angular 2 routing to host different child routes under the tabs.
- A data grid control that supports client- and server-side sorting, filtering and paging.

Upcoming features:
- Data grid column templates to allow custom content within table cells.
- Enum/select filter type for the data grid. 

Pending Feedback:
- A button group in the DatePicker to choose Today, Clear or Close.
- The data grid filter popovers go off-screen if the table is next to the edge of the screen.

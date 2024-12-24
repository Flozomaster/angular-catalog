// import { Component } from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'catalog';
}

import { Component, input, signal } from '@angular/core';
import { Widget } from '../../models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptions } from '../widget/widget-options/widget-options';

@Component({
  selector: 'app-widget-component',
  imports: [NgComponentOutlet, MatButtonModule, MatIcon, WidgetOptions],
  template: `
    <div class="container mat-elevation-z3" [style.background-color]="data().backgroundColor ?? 'white'" [style.color]="data().color ?? 'inherit'">
      <h3 class="m-0">{{ data().label }}</h3>
      <button
        mat-icon-button
        class="settings-button"
        (click)="showOptions.set(true)"
        [style.--mdc-icon-button-icon-color]="data().color ?? 'inherit'"
      >
        <mat-icon>settings</mat-icon>
      </button>
      <ng-container [ngComponentOutlet]="data().content"></ng-container>

      @if (showOptions()) {
      <app-widget-options [(showOptions)]="showOptions" [data]="data()" />
      }
    </div>
  `,
  styles: `
  :host {
    display: block;
    border-radius: 16px;
  }

  .container {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
    border-radius: inherit;
    overflow: hidden;
  }

  .settings-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  `,
  host: {
    '[style.grid-area]':
      '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)',
  },
})
export class WidgetComponent {
  data = input.required<Widget>();

  showOptions = signal(false);
}

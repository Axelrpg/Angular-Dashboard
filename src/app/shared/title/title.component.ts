import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<h1 class="text-3xl mb-5">{{ title }}</h1>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TitleComponent {
  @Input({required: true,}) title!: string;

  @Input({transform: booleanAttribute}) withShadow: boolean = false;
}

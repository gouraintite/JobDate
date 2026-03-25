import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="fullPage ? 'fixed inset-0 flex items-center justify-center bg-white/60 z-50' : 'flex justify-center py-8'">
      <div class="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  `,
})
export class LoaderComponent {
  @Input() fullPage = false;
}

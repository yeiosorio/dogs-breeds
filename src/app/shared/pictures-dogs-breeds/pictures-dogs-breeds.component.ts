import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgOptimizedImage, ImageConfig, IMAGE_CONFIG } from '@angular/common';

@Component({
  selector: 'app-pictures-dogs-breeds',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      } as ImageConfig
    }
  ],
  templateUrl: './pictures-dogs-breeds.component.html',
  styleUrls: ['./pictures-dogs-breeds.component.scss']
})
export class PicturesDogsBreedsComponent {
  @Input() images: string[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;

  private imageConfig = inject(IMAGE_CONFIG);

  isPriority(image: string): boolean {
    // Priorizar la carga de las primeras 4 imágenes
    return this.images.indexOf(image) < 4;
  }

  getLoadingStrategy(image: string): 'eager' | 'lazy' {
    // Cargar las primeras 4 imágenes inmediatamente, el resto lazy
    return this.isPriority(image) ? 'eager' : 'lazy';
  }
}

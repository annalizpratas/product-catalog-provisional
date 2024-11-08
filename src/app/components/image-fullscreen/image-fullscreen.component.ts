import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-image-fullscreen',
  templateUrl: './image-fullscreen.component.html',
  styleUrls: ['./image-fullscreen.component.scss'],
})
export class ImageFullscreenComponent implements OnInit {
  @Input() imageUrls: string[] = [''];
  @Output() onClose = new EventEmitter<void>();

  ngOnInit() {
    if (!(window as any).bootstrap) {
      (window as any).bootstrap = bootstrap;
    }
  }

  openModal(imageUrls: string[]): void {
    this.imageUrls = imageUrls;
    const modalElement = document.getElementById('fullscreenImageModal');
    if (modalElement) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Bootstrap is not available');
      }
    } else {
      console.error('Modal element not found');
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('fullscreenImageModal');
    if (modalElement) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
          modalElement.addEventListener('hidden.bs.modal', () => {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
          });
          this.onClose.emit();
        }
      } else {
        console.error('Bootstrap is not available');
      }
    } else {
      console.error('Modal element not found');
    }
  }

  getImageUrl(nameImage: string): string {
    return `assets/images/products/${nameImage}`;
  }
}

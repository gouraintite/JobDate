import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './scan.component.html',
})
export class ScanComponent {
  private router = inject(Router);

  formats = [BarcodeFormat.QR_CODE];
  scanError = '';
  scanning = true;

  onScanSuccess(result: string) {
    this.scanning = false;
    // Extract token from URL: .../profile/<token>
    const match = result.match(/\/profile\/([^/?#]+)/);
    if (match) {
      this.router.navigate(['/profile', match[1]]);
    } else {
      this.scanError = 'QR code non reconnu. Assurez-vous de scanner un profil JobDate.';
      setTimeout(() => { this.scanning = true; this.scanError = ''; }, 3000);
    }
  }

  onScanError(err: unknown) {
    console.warn('Scan error:', err);
  }
}

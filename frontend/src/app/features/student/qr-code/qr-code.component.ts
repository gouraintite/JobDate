import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StudentService } from '../../../core/services/student.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './qr-code.component.html',
})
export class QrCodeComponent implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private studentService = inject(StudentService);

  qrUrl: SafeUrl | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.http.get(this.studentService.getQrCodeUrl(), { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.qrUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        this.loading = false;
      },
      error: () => { this.error = 'Impossible de charger le QR code'; this.loading = false; },
    });
  }

  download() {
    if (!this.qrUrl) return;
    const a = document.createElement('a');
    a.href = (this.qrUrl as { changingThisBreaksApplicationSecurity: string }).changingThisBreaksApplicationSecurity;
    a.download = 'jobdate-qr-code.png';
    a.click();
  }
}

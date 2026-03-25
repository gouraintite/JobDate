import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './public-profile.component.html',
})
export class PublicProfileComponent implements OnInit {
  @Input() token!: string;

  private studentService = inject(StudentService);

  student: Student | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.studentService.getPublicProfile(this.token).subscribe({
      next: (s) => { this.student = s; this.loading = false; },
      error: () => { this.error = 'Profil introuvable'; this.loading = false; },
    });
  }
}

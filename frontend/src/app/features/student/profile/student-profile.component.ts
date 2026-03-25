import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './student-profile.component.html',
})
export class StudentProfileComponent implements OnInit {
  private studentService = inject(StudentService);

  student: Student | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.studentService.getMyProfile().subscribe({
      next: (s) => { this.student = s; this.loading = false; },
      error: () => { this.error = 'Impossible de charger le profil'; this.loading = false; },
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../core/services/student.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-student-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './student-profile-edit.component.html',
})
export class StudentProfileEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    school: [''],
    domains: [''],
    interests: [''],
    linkedinUrl: [''],
    bio: [''],
  });

  loading = true;
  saving = false;
  error = '';
  cvFile: File | null = null;
  avatarFile: File | null = null;

  ngOnInit() {
    this.studentService.getMyProfile().subscribe({
      next: (s) => {
        this.form.patchValue({
          firstName: s.firstName,
          lastName: s.lastName || '',
          school: s.school || '',
          domains: s.domains.join(', '),
          interests: s.interests.join(', '),
          linkedinUrl: s.linkedinUrl || '',
          bio: s.bio || '',
        });
        this.loading = false;
      },
      error: () => { this.error = 'Impossible de charger le profil'; this.loading = false; },
    });
  }

  onCvChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.cvFile = input.files[0];
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.avatarFile = input.files[0];
  }

  submit() {
    this.saving = true;
    const v = this.form.value;

    const payload = {
      firstName: v.firstName || undefined,
      lastName: v.lastName || undefined,
      school: v.school || undefined,
      domains: v.domains ? v.domains.split(',').map((d) => d.trim()).filter(Boolean) : undefined,
      interests: v.interests ? v.interests.split(',').map((i) => i.trim()).filter(Boolean) : undefined,
      linkedinUrl: v.linkedinUrl || undefined,
      bio: v.bio || undefined,
    };

    this.studentService.updateProfile(payload).subscribe({
      next: () => {
        const uploads = [];
        if (this.cvFile) uploads.push(this.studentService.uploadCv(this.cvFile));
        if (this.avatarFile) uploads.push(this.studentService.uploadAvatar(this.avatarFile));

        if (!uploads.length) {
          this.router.navigate(['/student/profile']);
          return;
        }

        let done = 0;
        uploads.forEach((obs) =>
          obs.subscribe({
            next: () => { if (++done === uploads.length) this.router.navigate(['/student/profile']); },
            error: () => { this.error = 'Erreur lors de l\'upload'; this.saving = false; },
          }),
        );
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la sauvegarde';
        this.saving = false;
      },
    });
  }
}

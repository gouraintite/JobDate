import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Student, UpdateStudentPayload } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getMyProfile(): Observable<Student> {
    return this.get<Student>('/students/me');
  }

  getPublicProfile(token: string): Observable<Student> {
    return this.get<Student>(`/students/public/${token}`);
  }

  updateProfile(payload: UpdateStudentPayload): Observable<Student> {
    return this.patch<Student>('/students/me', payload);
  }

  uploadCv(file: File): Observable<Student> {
    const form = new FormData();
    form.append('cv', file);
    return this.http
      .post<{ success: boolean; data: Student }>(`${this.base}/students/me/cv`, form)
      .pipe(map((r) => r.data));
  }

  uploadAvatar(file: File): Observable<Student> {
    const form = new FormData();
    form.append('avatar', file);
    return this.http
      .post<{ success: boolean; data: Student }>(`${this.base}/students/me/avatar`, form)
      .pipe(map((r) => r.data));
  }

  getQrCodeUrl(): string {
    return `${this.base}/qr/me`;
  }
}

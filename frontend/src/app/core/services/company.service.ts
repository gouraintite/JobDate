import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Company, UpdateCompanyPayload } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getMyCompany(): Observable<Company> {
    return this.get<Company>('/companies/me');
  }

  updateCompany(payload: UpdateCompanyPayload): Observable<Company> {
    return this.patch<Company>('/companies/me', payload);
  }

  uploadLogo(file: File): Observable<Company> {
    const form = new FormData();
    form.append('logo', file);
    return this.http
      .post<{ success: boolean; data: Company }>(`${this.base}/companies/me/logo`, form)
      .pipe(map((r) => r.data));
  }
}

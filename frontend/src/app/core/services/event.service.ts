import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { JobEvent, CreateEventPayload } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  listEvents(filters?: { domain?: string; contractType?: string }): Observable<JobEvent[]> {
    const params = new URLSearchParams();
    if (filters?.domain) params.set('domain', filters.domain);
    if (filters?.contractType) params.set('contractType', filters.contractType);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.get<JobEvent[]>(`/events${query}`);
  }

  getEvent(id: string): Observable<JobEvent> {
    return this.get<JobEvent>(`/events/${id}`);
  }

  getMyEvents(): Observable<JobEvent[]> {
    return this.get<JobEvent[]>('/events/company/mine');
  }

  createEvent(payload: CreateEventPayload): Observable<JobEvent> {
    return this.post<JobEvent>('/events', payload);
  }

  updateEvent(id: string, payload: Partial<CreateEventPayload>): Observable<JobEvent> {
    return this.patch<JobEvent>(`/events/${id}`, payload);
  }

  deleteEvent(id: string): Observable<null> {
    return this.delete<null>(`/events/${id}`);
  }
}

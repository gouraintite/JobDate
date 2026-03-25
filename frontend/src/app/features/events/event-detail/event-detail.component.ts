import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { JobEvent } from '../../../core/models/event.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  @Input() id!: string;

  private eventService = inject(EventService);

  event: JobEvent | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.eventService.getEvent(this.id).subscribe({
      next: (e) => { this.event = e; this.loading = false; },
      error: () => { this.error = 'Événement introuvable'; this.loading = false; },
    });
  }
}

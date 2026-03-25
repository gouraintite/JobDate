import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { JobEvent } from '../../../core/models/event.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);

  events: JobEvent[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.eventService.listEvents().subscribe({
      next: (e) => { this.events = e; this.loading = false; },
      error: () => { this.error = 'Erreur de chargement'; this.loading = false; },
    });
  }
}

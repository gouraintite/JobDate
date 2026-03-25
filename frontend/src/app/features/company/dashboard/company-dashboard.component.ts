import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { EventService } from '../../../core/services/event.service';
import { Company } from '../../../core/models/company.model';
import { JobEvent } from '../../../core/models/event.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './company-dashboard.component.html',
})
export class CompanyDashboardComponent implements OnInit {
  private companyService = inject(CompanyService);
  private eventService = inject(EventService);

  company: Company | null = null;
  events: JobEvent[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    Promise.all([
      this.companyService.getMyCompany().toPromise(),
      this.eventService.getMyEvents().toPromise(),
    ]).then(([company, events]) => {
      this.company = company!;
      this.events = events!;
      this.loading = false;
    }).catch(() => { this.error = 'Erreur de chargement'; this.loading = false; });
  }

  deleteEvent(id: string) {
    if (!confirm('Supprimer cet événement ?')) return;
    this.eventService.deleteEvent(id).subscribe({
      next: () => { this.events = this.events.filter((e) => e._id !== id); },
    });
  }
}

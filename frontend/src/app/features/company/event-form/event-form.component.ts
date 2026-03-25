import { Component, OnInit, inject, Input } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event.service';
import { ContractType } from '../../../core/models/event.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  @Input() id?: string;

  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);

  contractTypes: ContractType[] = ['apprenticeship', 'internship', 'CDI', 'CDD'];
  contractLabels: Record<ContractType, string> = {
    apprenticeship: 'Alternance',
    internship: 'Stage',
    CDI: 'CDI',
    CDD: 'CDD',
  };

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required],
    targetDomains: [''],
    contractTypes: [[] as ContractType[]],
    linkedinUrl: [''],
  });

  loading = false;
  saving = false;
  error = '';
  isEdit = false;

  ngOnInit() {
    if (this.id) {
      this.isEdit = true;
      this.loading = true;
      this.eventService.getEvent(this.id).subscribe({
        next: (e) => {
          this.form.patchValue({
            title: e.title,
            description: e.description,
            date: new Date(e.date).toISOString().slice(0, 16),
            location: e.location,
            targetDomains: e.targetDomains.join(', '),
            contractTypes: e.contractTypes,
            linkedinUrl: e.linkedinUrl || '',
          });
          this.loading = false;
        },
        error: () => { this.error = 'Erreur de chargement'; this.loading = false; },
      });
    }
  }

  toggleContractType(ct: ContractType) {
    const current = this.form.value.contractTypes || [];
    const updated = current.includes(ct)
      ? current.filter((c) => c !== ct)
      : [...current, ct];
    this.form.patchValue({ contractTypes: updated });
  }

  submit() {
    if (this.form.invalid) return;
    this.saving = true;
    const v = this.form.value;

    const payload = {
      title: v.title!,
      description: v.description!,
      date: new Date(v.date!).toISOString(),
      location: v.location!,
      targetDomains: v.targetDomains ? v.targetDomains.split(',').map((d) => d.trim()).filter(Boolean) : [],
      contractTypes: v.contractTypes || [],
      linkedinUrl: v.linkedinUrl || undefined,
    };

    const obs = this.isEdit
      ? this.eventService.updateEvent(this.id!, payload)
      : this.eventService.createEvent(payload);

    obs.subscribe({
      next: () => this.router.navigate(['/company/dashboard']),
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la sauvegarde';
        this.saving = false;
      },
    });
  }
}

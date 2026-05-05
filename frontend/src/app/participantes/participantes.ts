import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { ActivityService, Activity } from '../services/activity.service';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './participantes.html',
  styleUrls: ['./participantes.css']
})
export class ParticipantesComponent implements OnInit {
  activities: (Activity & { participants?: any[], expanded?: boolean })[] = [];
  loading: boolean = true;

  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    this.loading = true;
    this.activityService.getActivities().subscribe({
      next: (data) => {
        // Sort by date ascending (nearest first)
        this.activities = data
          .sort((a, b) => new Date(a.activityDate).getTime() - new Date(b.activityDate).getTime())
          .map(a => ({ ...a, expanded: false }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando actividades:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleParticipants(activity: any) {
    if (activity.expanded) {
      activity.expanded = false;
    } else {
      if (!activity.participants) {
        this.activityService.getEnrollmentsByActivity(activity.id).subscribe({
          next: (enrollments) => {
            activity.participants = enrollments;
            activity.expanded = true;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error cargando participantes:', err)
        });
      } else {
        activity.expanded = true;
      }
    }
    this.cdr.detectChanges();
  }
}

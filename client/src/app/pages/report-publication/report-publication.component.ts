import { Component, computed } from '@angular/core';
import { PublicationService } from '../../services/publication/publication.service';

import { Router } from '@angular/router';
import { ReportPublication } from '../../models/report-publication';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-report-publication',
  templateUrl: './report-publication.component.html',
  styleUrl: './report-publication.component.css'
})
export class ReportPublicationComponent {
  users: { [id: number]: string } = {};
  uniqueIds: number[] = [];
  reportPublications = computed(() => this.publicationService.getReportPublicationView());

  constructor(private publicationService: PublicationService, private userService: UserService) {
    this.getIds(this.reportPublications());
    this.setUserNames();
  }

  setUserNames() {
    for (const id of this.uniqueIds) {
      this.getOtherUserName(id);
    }
  }

  getOtherUserName(id: number) {
    this.userService.getUserName(id).subscribe(
      (user: string) => {
        this.users[id] = user;
      }
    )
  }

  getIds(reportPublications: ReportPublication[]) {
    for (const report of reportPublications) {
      if (!this.uniqueIds.includes(report.users_id)) {
        this.uniqueIds.push(report.users_id);
      }
    }
  }
}

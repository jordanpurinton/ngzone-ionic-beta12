import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'vehicle-report-card',
  templateUrl: './vehicle-report-card.component.html',
  styleUrls: ['./vehicle-report-card.component.scss']
})
export class VehicleReportCardComponent implements OnInit {

  @Input() reportData: any;
  @Input() selectedSortType: string;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  formatDate(date) {
    return moment(date).format('MMMM D, YYYY');
  }

  async editVehicleReport() {
  }
}

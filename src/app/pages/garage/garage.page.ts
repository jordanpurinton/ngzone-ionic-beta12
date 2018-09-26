import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { to } from 'await-to-js';
import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss']
})
export class GaragePage implements OnInit {
  reportData: any;
  filterData: any;
  reportType: string;
  sortTypeLabels: string[] = ['Date', 'Provider', 'Cost', 'Mileage', 'Images'];
  sortTypeValues: string[] = ['date_occurred', 'provider', 'cost', 'mileage', 'files'];
  selectedSortType = 'date_occurred';
  sortOrderType = 'asc';

  constructor(
    public alertController: AlertController,
    public router: Router,
    public ngZone: NgZone,
    public http: HttpClient
  ) {
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getJSON().subscribe(
      data => {
        console.log(data)
        this.reportData = data;
        this.selectedSortType === 'date_occurred' && this.reportData.length > 1 ? this.sortData(true) : this.sortData();
        this.stupidUpdateHelper();
      }
    );
  }

  getJSON(): Observable<any> {
    return this.http.get('assets/data.json');
  }

  async openFilterPrompt() {
    const inputs = [];
    for (let i = 0; i < this.sortTypeValues.length; i++) {
      inputs.push({
        type: 'radio',
        label: this.sortTypeLabels[i],
        value: this.sortTypeValues[i],
        checked: this.selectedSortType === this.sortTypeValues[i]
      });
    }
    const alert = await this.alertController.create({
      header: 'Sort By',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            this.selectedSortType = data;
            this.selectedSortType === 'date_occurred' ? this.sortData(true) : this.sortData();
          }
        }
      ]
    });
    await alert.present();
  }

  sortData(isDate?) {
    // this.ngZone.run( // put this is to see the list filter properly when a filter type is selected
      // () => {

        // descending date
        if (isDate && this.sortOrderType === 'dsc') {
          this.filterData = this.reportData.sort((a, b) => +new Date(b.date_occurred) - +new Date(a.date_occurred));
        }

        // ascending date
        else if (isDate && this.sortOrderType === 'asc') {
          this.filterData = this.reportData.sort((a, b) => +new Date(a.date_occurred) - +new Date(b.date_occurred));
        }

        // descending provider
        else if (this.sortOrderType === 'dsc' && this.selectedSortType === 'provider') {
          this.filterData = this.reportData.sort((a, b) => {
            // null check so filtering doesn't break
            const providers = [null, null];
            providers[0] = a.provider ? a.provider : '';
            providers[1] = b.provider ? b.provider : '';
            return +(!providers[0]) - +(!providers[1]) || providers[1].toLowerCase().localeCompare(providers[0].toLowerCase());
          });
        }

        // ascending provider
        else if (this.sortOrderType === 'asc' && this.selectedSortType === 'provider') {
          this.filterData = this.reportData.sort((a, b) => {
            // null check so filtering doesn't break
            const providers = [null, null];
            providers[0] = a.provider ? a.provider : '';
            providers[1] = b.provider ? b.provider : '';
            return +(!providers[1]) - +(!providers[0]) || providers[0].toLowerCase().localeCompare(providers[1].toLowerCase());
          });
        }

        // descending mileage/cost
        else if (this.sortOrderType === 'dsc' && this.selectedSortType !== 'files') {
          this.filterData = this.reportData.sort((a, b) => {
            return +(!a[this.selectedSortType]) - +(!b[this.selectedSortType]) || b[this.selectedSortType] - a[this.selectedSortType];
          });
        }

        // ascending mileage/cost
        else if (this.sortOrderType === 'asc' && this.selectedSortType !== 'files') {
          this.filterData = this.reportData.sort((a, b) => {
            return +(!b[this.selectedSortType]) - +(!a[this.selectedSortType]) || a[this.selectedSortType] - b[this.selectedSortType];
          });
        }

        // descending image count
        else if (this.sortOrderType === 'dsc' && this.selectedSortType === 'files') {
          this.filterData = this.reportData.sort((a, b) => {
            return +(!a['files'].length) - +(!b['files'].length) || b['files'].length - a['files'].length;
          });
        }

        // ascending image count
        else {
          this.filterData = this.reportData.sort((a, b) => {
            return +(!b['files'].length) - +(!a['files'].length) || a['files'].length - b['files'].length;
          });
        }
      // } // put this is to see the list filter properly when a filter type is selected
    // );
  }

  segmentChanged(order) {
    this.sortOrderType = order.detail.value;
    this.selectedSortType === 'date_occurred' ? this.sortData(true) : this.sortData();
  }

  toCapitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  formatDate(date) {
    return moment(date).format('MMMM D, YYYY');
  }

  trackByFn(doc) {
    return doc.id;
  }

  /*
  such stupid code to make the content update because the content won't update automatically
  unless you click something or scroll somewhere I hate this it's so bad I'm sorry
  */
  stupidUpdateHelper() {
    const elem = document.getElementById('content');
    const event = new MouseEvent('click');
    elem.dispatchEvent(event);
  }
}

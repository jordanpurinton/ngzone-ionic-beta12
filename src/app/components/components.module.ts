import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
    NO_ERRORS_SCHEMA
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {VehicleReportCardComponent} from './vehicle-report-card/vehicle-report-card.component';

@NgModule({
    declarations: [
        VehicleReportCardComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        VehicleReportCardComponent
    ],
    providers: [
        VehicleReportCardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ComponentsModule {
}

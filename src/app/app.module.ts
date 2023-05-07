import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomeComponent } from './home/home.component';
import { MedicCardComponent } from './medic-card/medic-card.component';
import { DrugCardComponent } from './drug-card/drug-card.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicationsComponent } from './medications/medications.component';
import { MedicationFormComponent } from './medications/medication-form/medication-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicFormComponent } from './medics/medic-form/medic-form.component';
import { MedicPageComponent } from './medics/medic-page/medic-page.component';
import { MedicAppointmentComponent } from './medics/medic-appointment/medic-appointment.component';
import { MedicProfileComponent } from './medics/medic-profile/medic-profile.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PaymentPresentationComponent } from './payment-presentation/payment-presentation.component';
import { PrescriptionFormComponent } from './prescriptions/prescription-form/prescription-form.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MedicCardComponent,
    DrugCardComponent,
    MedicsComponent,
    MedicationsComponent,
    MedicationFormComponent,
    MedicFormComponent,
    MedicPageComponent,
    MedicAppointmentComponent,
    MedicProfileComponent,
    PrescriptionsComponent,
    ShoppingCartComponent,
    SettingsComponent,
    AppointmentsComponent,
    PaymentPresentationComponent,
    PrescriptionFormComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

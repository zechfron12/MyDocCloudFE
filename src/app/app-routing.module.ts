import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicsComponent } from './medics/medics.component';
import { MedicationsComponent } from './medications/medications.component';
import { HomeComponent } from './home/home.component';
import { MedicPageComponent } from './medics/medic-page/medic-page.component';
import { MedicProfileComponent } from './medics/medic-profile/medic-profile.component';
import { MedicAppointmentComponent } from './medics/medic-appointment/medic-appointment.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PaymentPresentationComponent } from './payment-presentation/payment-presentation.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'medics',
    component: MedicsComponent,
  },
  {
    path: 'prescriptions',
    component: PrescriptionsComponent,
  },
  {
    path: 'medics/:id',
    component: MedicPageComponent,
    children: [
      {
        path: 'profile',
        component: MedicProfileComponent,
      },
      {
        path: 'appointment',
        component: MedicAppointmentComponent,
      },
    ],
  },
  { path: 'medications', component: MedicationsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'payment', component: PaymentPresentationComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 0],
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

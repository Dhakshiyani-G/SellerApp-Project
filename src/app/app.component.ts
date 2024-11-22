import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material.module';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule, DashboardComponent],
  providers: [CountryService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navigationItems = [
    { svgIcon: 'dashboard', title: 'Dashboard' },
    { svgIcon: 'payment', title: 'Payment' },
    { svgIcon: 'customers', title: 'Customers' },
    { svgIcon: 'messages', title: 'Messages' },
    { svgIcon: 'product', title: 'Product' },
    { svgIcon: 'invoice', title: 'Invoice' },
    { svgIcon: 'analytics', title: 'Analytics' },
    { svgIcon: 'settings', title: 'Settings' },
    { svgIcon: 'security', title: 'Security' },
    { svgIcon: 'help', title: 'Help' },
    { svgIcon: 'logout', title: 'Log Out' },
  ];

  countries: any[] = [];
  selectedCountry: any = {};

  constructor(private countryService: CountryService) {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    const icons = [
      { name: 'text-logo', path: 'text-logo.svg' },
      { name: 'logo', path: 'logo.svg' },
      { name: 'arrow-close', path: 'arrow-close.svg' },
      { name: 'arrow-open', path: 'arrow-open.svg' },
      { name: 'dashboard', path: 'dashboard.svg' },
      { name: 'payment', path: 'payment.svg' },
      { name: 'customers', path: 'customers.svg' },
      { name: 'messages', path: 'messages.svg' },
      { name: 'product', path: 'product.svg' },
      { name: 'invoice', path: 'invoice.svg' },
      { name: 'analytics', path: 'analytics.svg' },
      { name: 'settings', path: 'settings.svg' },
      { name: 'security', path: 'security.svg' },
      { name: 'help', path: 'help.svg' },
      { name: 'logout', path: 'logout.svg' },
      { name: 'dropdown', path: 'dropdown.svg' },
      { name: 'user', path: 'user.svg' },
    ];

    icons.forEach((icon) =>
      iconRegistry.addSvgIcon(
        icon.name,
        sanitizer.bypassSecurityTrustResourceUrl(icon.path)
      )
    );
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavExpanded = true;

  ngOnInit(): void {
    this.countryService.getData().subscribe((data: any) => {
      this.countries = data.countries;
      if (this.countries.length > 0) {
        this.selectedCountry = this.countries[0];
        this.countryService.updateSelectedCountry(this.selectedCountry);
      }
    });
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.countryService.updateSelectedCountry(this.selectedCountry);
  }

  toggleSidenav() {
    this.isSidenavExpanded = !this.isSidenavExpanded;
  }
}

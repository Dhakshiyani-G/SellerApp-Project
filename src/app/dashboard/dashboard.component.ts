import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { CountryService } from '../country.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  application: string;
  type: string;
  rate: number;
  profit: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { application: 'Stripe', type: 'Finance', rate: 33, profit: 10000 },
  { application: 'Zapier', type: 'CRM', rate: 27, profit: 8000 },
  { application: 'Shopify', type: 'Marketplace', rate: 40, profit: 13000 },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedCountry: any;
  titles = ['Total Income', 'Profit', 'Total Views', 'Conversion Rate'];
  chartOptions1: any;
  chartOptions2: any;
  chartOptions3: any;

  displayedColumns: string[] = [
    'select',
    'application',
    'type',
    'rate',
    'profit',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private countryService: CountryService) {
    this.chartOptions1 = {
      series: [
        {
          name: 'Total Revenue',
          data: [9, 5, 19, 15, 10, 17, 12, 10, 20, 14],
        },
        {
          name: 'Total Target',
          data: [5, 14, 8, 18, 13, 6, 16, 5, 8, 10],
        },
      ],
      chart: {
        height: 220,
        type: 'line',
        toolbar: false,
      },
      title: {
        text: 'Sales Overview',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 700,
          fontFamily: 'Roboto',
          color: 'black',
          margin: 20,
        },
      },
      xaxis: {
        categories: [
          'Apr 2023',
          'May 2023',
          'Jun 2023',
          'Jul 2023',
          'Aug 2023',
          'Sep 2023',
          'Oct 2023',
          'Nov 2023',
          'Dec 2023',
          'Jan 2024',
        ],
      },
      yaxis: {
        labels: {
          formatter: (value: any) => `$${value}`,
        },
        min: 0,
        max: 20,
        tickAmount: 3,
      },
      stroke: {
        curve: 'smooth',
      },
      // colors: ['#f9f9f9', 'blue'],
    };
    this.chartOptions2 = {
      series: [
        {
          name: 'Sales',
          data: [10, 41, 35, 51, 49, 25],
        },
      ],
      chart: {
        height: 220,
        type: 'radar',
        toolbar: false,
      },
      title: {
        text: 'Sales by Region',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 700,
          fontFamily: 'Roboto',
          color: 'black',
          margin: 20,
        },
      },
      xaxis: {
        categories: [
          'Asia',
          'Europe',
          'America',
          'Africa',
          'Middle East',
          'Pacific',
        ],
      },
      yaxis: {
        show: false,
      },
    };
    this.chartOptions3 = {
      chart: {
        height: 220,
        type: 'radialBar',
        toolbar: false,
      },
      title: {
        text: 'Registered Users',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 700,
          fontFamily: 'Roboto',
          color: 'black',
          margin: 20,
        },
      },
      series: [67],
      colors: ['#20E647'],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#333',
            startAngle: -90,
            endAngle: 90,
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.countryService.getSelectedCountry().subscribe((data: any) => {
      this.selectedCountry = data;
    });
  }

  getBackgroundColor(title: string): string {
    if (this.selectedCountry.countryName === 'USA') {
      return 'rgb(247, 184, 184)';
    }
    return '#b8e9d4';
  }

  getValueForTitle(title: string): string {
    switch (title) {
      case 'Total Income':
        return (
          this.selectedCountry.totalIncome,
          this.selectedCountry.totalIncomePercentage
        );
      case 'Profit':
        return (
          this.selectedCountry.profit, this.selectedCountry.profitPercentage
        );
      case 'Total Views':
        return (
          this.selectedCountry.totalViews,
          this.selectedCountry.totalViewsPercentage
        );
      case 'Conversion Rate':
        return (
          this.selectedCountry.conversionRate,
          this.selectedCountry.conversionRatePercentage
        );
      default:
        return '';
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.application + 1
    }`;
  }
}

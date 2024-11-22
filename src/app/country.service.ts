import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private dataURL = 'data.json';
  private selectedCountry = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataURL);
  }

  getSelectedCountry(): Observable<any> {
    return this.selectedCountry.asObservable();
  }

  updateSelectedCountry(country: any): void {
    this.selectedCountry.next(country);
  }
}

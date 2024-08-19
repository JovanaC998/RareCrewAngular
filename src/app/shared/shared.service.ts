import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

export interface Employees {
  EmployeeName: string;
  StarTimeUtc: string;
  EndTimeUtc: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private httpClient = inject(HttpClient);

  private data = new BehaviorSubject<any[]>([]);
  data$ = this.data.asObservable();

  private header = new HttpHeaders({
    'key': 'vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
  });

  private api = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
  
  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http.get<Employees[]>(this.api, { headers: this.header })
      .pipe(
        map(data => {
          const employeeHoursMap = data.reduce((acc, employee) => {
            const hours = (new Date(employee.EndTimeUtc).getTime() - new Date(employee.StarTimeUtc).getTime()) / (1000 * 60 * 60);

            const employeeName = employee.EmployeeName || 'No name';

            if (!acc[employeeName]) {
              acc[employeeName] = 0;
            }
            acc[employeeName] += Math.max(hours, 0); 

            return acc;
          }, {} as { [key: string]: number });

          return Object.keys(employeeHoursMap).map(name => ({
            name: name,
            totalTimeInHours: Math.ceil(employeeHoursMap[name])
          }));
        })
      )
      .subscribe(groupedData => {
        this.data.next(groupedData);
      });
  }
}

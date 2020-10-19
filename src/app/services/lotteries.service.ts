import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Lottery } from '../models/Lottery';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LotteriesService {
  baseUrl = environment.baseUrl;
  lotteriesUrl = this.baseUrl+"/lotteries";

  constructor(private http: HttpClient) { }

  getLotteries():Observable<Lottery[]>{
    return this.http.get<Lottery[]>(this.lotteriesUrl);
  }
}

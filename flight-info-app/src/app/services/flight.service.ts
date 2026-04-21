import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// @Injectable: Angular zarządza instancją serwisu (singleton); providedIn: 'root' udostępnia go wszędzie.
@Injectable({ providedIn: 'root' })
export class FlightService {
  // URL proxy (zdefiniowany w proxy.conf.json) przekierowuje zapytania do OpenSky API, obchodząc CORS.
  private url = '/api-sky/api/states/all';

  // HttpClient to narzędzie do zapytań HTTP (pobierania danych z API).
  constructor(private http: HttpClient) { }

  // Wysyła GET do API; firstValueFrom konwertuje Observable na Promise (umożliwia async/await).
  async getFlight(nr: string) {
    const res: any = await firstValueFrom(this.http.get(this.url));

    // Odpowiedź API zwraca tablicę; szukamy samolotu po callsign na indeksie [1].
    return res.states.find((s: any) => s[1].trim().toLowerCase() === nr.toLowerCase());
  }
}

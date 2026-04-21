import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from './services/flight.service';

// @Component: konfiguracja komponentu; standalone: true oznacza nowoczesny Angular bez modułów.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Zmienne dostępne w pliku app.html poprzez {{ }} i [(ngModel)].
  nr = '';
  lot: any = null;
  error = '';

  // Dependency Injection: Angular automatycznie tworzy i wstrzykuje serwis FlightService.
  constructor(private fs: FlightService) { }

  // Pobiera dane z API poprzez serwis; async/await czeka na odpowiedź HTTP.
  async szukaj() {
    // Resetowanie stanu przed nowym wyszukiwaniem.
    this.error = '';
    this.lot = null;

    try {
      this.lot = await this.fs.getFlight(this.nr);
      if (!this.lot) this.error = 'Nie znaleziono takiego lotu w powietrzu.';
    } catch {
      // Jeśli API nie odpowiada lub nastąpi błąd sieci, Observable wywoła catch.
      this.error = 'Błąd połączenia (sprawdź CORS).';
    }
  }
}

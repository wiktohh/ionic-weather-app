import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  city: string = '';

  constructor(private router: Router) {}

  handleInput(event: any) {
    this.goToWeatherPage(event.target.value as string);
  }

  goToWeatherPage(city?: string) {
    const selectedCity = city || this.city;
    if (selectedCity) {
      this.router.navigate(['/weather', selectedCity]);
    }
  }
}

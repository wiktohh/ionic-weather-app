import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  city: string = '';
  cities: string[] = ['london', 'paris', 'washington', 'tokyo', 'sydney'];

  constructor(private router: Router, private weatherService: WeatherService) {}

  handleInput(event: any) {
    const city = event.target.value.toLowerCase() as string;
    if (city) {
      this.weatherService.getWeather(city).subscribe(
        (data: any) => {
          console.log(data);
          if (!this.cities.includes(city)) {
            this.cities.unshift(city);
          } else {
            const index = this.cities.indexOf(city);
            this.cities.splice(index, 1);
            this.cities.unshift(city);
          }
          this.goToWeatherPage(city);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  goToWeatherPage(city?: string) {
    const selectedCity = city || this.city;
    if (selectedCity) {
      this.router.navigate(['/weather', selectedCity]);
    }
  }
}

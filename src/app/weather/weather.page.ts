import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage {
  weather: any;
  city: string = '';

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.city = this.route.snapshot.paramMap.get('city') as string;
    this.getWeather();
    console.log(this.weather);
  }

  getWeatherIcon() {
    switch (this.weather.weather[0].main.toLowerCase()) {
      case 'clouds':
        return 'cloud-outline';
      case 'rain':
        return 'rainy-outline';
      case 'snow':
        return 'snow-outline';
      case 'clear':
        return 'sunny-outline';
      default:
        return 'partly-sunny-outline';
    }
  }

  getWeather() {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe((data) => {
        this.weather = data;
        console.log(data);
      });
    }
  }
}

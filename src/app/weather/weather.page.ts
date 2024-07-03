import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

//added by Pawel
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage {
  weather: any;
  city: string = '';
  notFound: boolean = false;

  //added by Pawel
  networkStatus: boolean = true;
  networkStatus$: Subscription = Subscription.EMPTY;
  badNetwork: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.city = this.route.snapshot.paramMap.get('city') as string;
    this.getWeather();
  }

  //added by Pawel
  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        console.log('status', status);
        this.networkStatus = status;
      });
  }

  getWeatherIcon() {
    if (this.weather && this.weather.weather) {
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
    return 'partly-sunny-outline';
  }

  getWeather() {
    this.checkNetworkStatus();
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe(
        (data) => {
          this.weather = data;
          this.notFound = false;
          this.badNetwork = false;
        },
        (error) => {
          //changed slightely by Pawel

          console.error(error);
          this.weather = null;
          if (!this.networkStatus) {
            this.badNetwork = true;
          } else {
            this.notFound = true;
          }
        }
      );
    }
  }
}

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'https://raw.githubusercontent.com/jinsenglin/fake-rest-api-server/master/ng/hero.json';  // URL to web api
 
  constructor(private http: Http) { }
 
  getHero(): Promise<Hero> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json() as Hero)
               .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

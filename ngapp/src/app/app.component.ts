import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService) { }

  getHero(): void {
    this.heroService
        .getHero()
        .then(hero => this.hero = hero);
  }

  ngOnInit(): void {
    this.getHero();
  }

  title = 'app';
}

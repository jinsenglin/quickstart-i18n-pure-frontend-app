import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  hero: Hero;

  private svg: any;

  constructor(
    private heroService: HeroService) { }

  getHero(): void {
    this.heroService
        .getHero()
        .then(hero => this.hero = hero)
        .then(function(hero) {
            d3.select("body").append("svg").attr("width", 800).attr("height", 600)
              .append("circle").attr("cx", function (d) { return 400; })
                               .attr("cy", function (d) { return hero.id; })
                               .attr("r", function (d) { return 10; })
                               .attr("fill", function (d) { return "#f00"; });
        });
  }

  ngOnInit(): void {
    this.getHero();
  }

  title = 'app';
}

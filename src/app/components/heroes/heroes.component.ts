import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { AddHeroDialogComponent } from '../add-hero-dialog/add-hero-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  openNewHeroDialog(): void {
    const dialogRef = this.dialog.open(AddHeroDialogComponent, { width: '500px', height: '300px' });
    dialogRef.afterClosed().subscribe(() => this.getHeroes());
  };
}

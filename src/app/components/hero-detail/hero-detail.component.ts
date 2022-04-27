import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { EditHeroDialogComponent } from '../edit-hero-dialog/edit-hero-dialog.component';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getHeroDetails();
  }

  getHeroDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  editHero(): void {
    const dialogRef = this.dialog.open(EditHeroDialogComponent, { data: this.hero });
    dialogRef.afterClosed().subscribe(() => this.getHeroDetails());
  }
}

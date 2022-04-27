import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { FormControl, FormGroup } from '@angular/forms';

import { Hero } from '../../interfaces/hero';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hero-dialog',
  templateUrl: './add-hero-dialog.component.html',
  styleUrls: ['./add-hero-dialog.component.css']
})
export class AddHeroDialogComponent implements OnInit {

  newHeroForm = new FormGroup({
    newHeroName: new FormControl(''),
    newHeroPower: new FormControl('')
  });

  constructor(private heroService: HeroService, public dialogRef: MatDialogRef<AddHeroDialogComponent>) { }

  ngOnInit(): void {
  }

  add(name: string, power: string): void {
    name = name.trim();
    power = power.trim();
    if (!(name && power)) { return; }
    this.heroService.addHero({ name, power } as Hero)
      .subscribe();
  }

  onSubmit() {
    const newHero = {
      name: this.newHeroForm.get('newHeroName')?.value,
      power: this.newHeroForm.get('newHeroPower')?.value
    };
    this.add(newHero.name, newHero.power);
  }



}

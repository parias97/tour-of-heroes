import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-edit-hero-dialog-component',
  templateUrl: './edit-hero-dialog.component.html',
  styleUrls: ['./edit-hero-dialog.component.css'],
})
export class EditHeroDialogComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    public dialogRef: MatDialogRef<EditHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero
  ) { }

  editHeroForm = new FormGroup({
    editHeroName: new FormControl(this.hero.name),
    editHeroPower: new FormControl(this.hero.power),
  });

  ngOnInit(): void { }

  edit(hero: Hero) {
    if (hero) {
      this.heroService.updateHero(hero).subscribe();
    }
  }

  onSubmit() {
    const editedHero = {
      id: this.hero.id,
      name: this.editHeroForm.get('editHeroName')?.value,
      power: this.editHeroForm.get('editHeroPower')?.value,
    };
    this.edit(editedHero);
  }
}

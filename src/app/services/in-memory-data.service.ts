import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', power: 'super-strength' },
      { id: 12, name: 'Narco', power: 'manipulation' },
      { id: 13, name: 'Bombasto', power: 'heat-ray vision' },
      { id: 14, name: 'Celeritas', power: 'telekinesis' },
      { id: 15, name: 'Magneta', power: 'magnetism' },
      { id: 16, name: 'RubberMan', power: 'super-stretch' },
      { id: 17, name: 'Frozo', power: 'freezing' },
      { id: 18, name: 'Dr IQ', power: 'super-intelligence' },
      { id: 19, name: 'Magma', power: 'explodes' },
      { id: 20, name: 'Tornado', power: 'super-speed' }
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
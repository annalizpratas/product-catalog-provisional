import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-card-select-category',
  templateUrl: './card-select-category.component.html',
  styleUrls: ['./card-select-category.component.scss'],
})
export class CardSelectCategoryComponent {
  constructor(private route: Router, private loading: LoadingService) {}

  categories = [
    {
      id: 3,
      name: 'Colares',
      image: 'assets/categories/colar.png',
    },
    {
      id: 5,
      name: 'Anéis',
      image: 'assets/categories/anel.png',
    },
    {
      id: 6,
      name: 'Brincos',
      image: 'assets/categories/brinco.png',
    },
    {
      id: 8,
      name: 'Pulseiras',
      image: 'assets/categories/pulseira.png',
    },
    {
      id: 7,
      name: 'Piercing',
      image: 'assets/categories/piercing.png',
    },
    {
      id: 4,
      name: 'Pingente',
      image: 'assets/categories/pingente.png',
    },
  ];

  navigateTo(id: number) {
    this.loading.show();
    setTimeout(() => {
      this.route.navigate([`/pratas/${id}`]);
      this.loading.hide();
    }, 500);
  }
}

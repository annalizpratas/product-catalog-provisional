import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  menuList = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductCategory().subscribe((data) => {
      this.menuList = data.response;
    });
  }
}

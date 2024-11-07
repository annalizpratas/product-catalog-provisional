import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-promo',
  templateUrl: './banner-promo.component.html',
  styleUrls: ['./banner-promo.component.scss'],
})
export class BannerPromoComponent implements OnInit {
  @Input() size: string;

  ngOnInit(): void {}

  get bannerSize(): string {
    return this.size === 'large' ? 'banner-large' : 'banner-small';
  }
}

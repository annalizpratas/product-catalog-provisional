import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageFullscreenComponent } from 'src/app/components/image-fullscreen/image-fullscreen.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, AfterViewInit {
  @ViewChild(ImageFullscreenComponent)
  fullscreenImageModal!: ImageFullscreenComponent;

  url = environment.apiUrl;

  msgError = '';

  productList = [];

  isModalOpened = false;

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingService,
    private productsService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.fullscreenImageModal.onClose.subscribe(() => {
      setTimeout(() => {
        this.isModalOpened = false;
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id_product_category = params['id_product_category'];

      if (!id_product_category) {
        this.getProductListDefault();
        return;
      }

      this.getProductList(id_product_category);
    });
  }

  getImageUrl(nameImage: string): string {
    return `assets/images/products/${nameImage}`;
  }

  getProductListName(product_name: string): void {
    this.loading.show();

    this.productsService.getProductName(false, product_name).subscribe(
      (data) => {
        this.productList = data.response;
        this.msgError = '';
        this.loading.hide();
      },
      (error) => {
        console.error('Erro ao listar produtos:', error);
        this.msgError = error?.error?.message || 'Erro ao listar produtos';
        this.dismissError();
        this.getProductListDefault();
        this.loading.hide();
      }
    );
  }

  openImageModal(imageUrl: string[]) {
    if (!this.isModalOpened) {
      this.isModalOpened = true;
      this.fullscreenImageModal.openModal(imageUrl);
    }
  }

  parseProductPrices(price: any): number {
    return parseFloat(price);
  }

  private getProductList(id_product_category: number): void {
    this.loading.show();

    this.productsService.getProduct(false, id_product_category).subscribe(
      (data) => {
        this.productList = data.response;
        this.msgError = '';
        this.loading.hide();
      },
      (error) => {
        console.error('Erro ao listar produtos:', error);
        this.msgError = error?.error?.message || 'Erro ao listar produtos';
        this.dismissError();
        this.getProductListDefault();
        this.loading.hide();
      }
    );
  }

  private getProductListDefault(): void {
    this.loading.show();

    this.productsService.getProduct(false).subscribe((data) => {
      this.productList = data.response;
      this.loading.hide();
    });
  }

  private dismissError(): void {
    setTimeout(() => {
      this.msgError = '';
    }, 3000);
  }
}

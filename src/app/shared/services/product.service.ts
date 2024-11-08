import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { ResponseModel } from '../models/reponse.model';
import { ProductModel } from '../models/product.model';
import { products } from 'src/mocks/products';
import { categories } from 'src/mocks/categories';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Product
  getProduct(
    is_promo: boolean,
    id_product_category?: number
  ): Observable<ResponseModel<ProductModel[]>> {
    const filterNameProducts = products.filter((product) => {
      return is_promo
        ? product.is_promo &&
            product.id_category == id_product_category
        : product.id_category == id_product_category;
    });

    return new Observable<ResponseModel<ProductModel[]>>((observer) => {
      observer.next({ response: filterNameProducts, message: 'Success' });
      observer.complete();
    });
  }

  getProductName(
    is_promo: boolean,
    name_product?: string
  ): Observable<ResponseModel<ProductModel[]>> {
    const filterNameProducts = products.filter((product) => {
      return is_promo
        ? product.is_promo &&
            product.name
              .toLocaleLowerCase()
              .includes(name_product.toLocaleLowerCase())
        : product.name
            .toLocaleLowerCase()
            .includes(name_product.toLocaleLowerCase());
    });

    return new Observable<ResponseModel<ProductModel[]>>((observer) => {
      observer.next({ response: filterNameProducts, message: 'Success' });
      observer.complete();
    });
  }

  getProductCategory(): Observable<
    ResponseModel<{ id: number; name: string }[]>
  > {
    return new Observable<ResponseModel<{ id: number; name: string }[]>>(
      (observer) => {
        observer.next({ response: categories, message: 'Success' });
        observer.complete();
      }
    );
  }

  // IMAGES
  getImages(nameImage: string): string {
    return `${this.url}/uploads/${nameImage}`;
  }
}

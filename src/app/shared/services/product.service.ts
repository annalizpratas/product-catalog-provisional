import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { ResponseModel } from '../models/reponse.model';
import { ProductModel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  // Product
  getProduct(is_promo: boolean, id_product_category?: number): Observable<ResponseModel<ProductModel[]>> {
    const url = id_product_category
      ? `${this.url}/product-list/${id_product_category}`
      : `${this.url}/product-list`;

    const params: any = {};
    if (is_promo !== undefined) {
      params.is_promo = is_promo;
    }

    return this.http.get<ResponseModel<ProductModel[]>>(`${url}`, { params });
  }

  getProductName(is_promo: boolean, name_product?: string): Observable<ResponseModel<ProductModel[]>> {
    const url = name_product
      ? `${this.url}/product-name-list/${name_product}`
      : `${this.url}/product-list`;

    const params: any = {};
    if (is_promo !== undefined) {
      params.is_promo = is_promo;
    }

    return this.http.get<ResponseModel<ProductModel[]>>(`${url}`, { params });
  }

  getProductStatus(): Observable<ResponseModel<{id: number, name: string}[]>> {
    return this.http.get<ResponseModel<{id: number, name: string}[]>>(`${this.url}/product-status-list`);
  }


  getProductCategory(): Observable<ResponseModel<{id: number, name: string}[]>> {
    return this.http.get<ResponseModel<{id: number, name: string}[]>>(`${this.url}/product-category-list`);
  }

  // IMAGES
  getImages(nameImage: string): string {
    return `${this.url}/uploads/${nameImage}`;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductResponse {
  Data: {
    availability: string;
    labels: {
      lower_left: {
        labelId: string;
        labeldata: {
          assets: any[];
          customData: string;
          labelId: string;
          name: string;
          orderHint: number;
          parentName: string;
        }
      }[];
    };
    isFavorite: boolean;
    tags: {
      assets: any[];
      customData: string;
      id: string;
      name: string;
      orderHint: number;
    }[];
    variants: {
      isMaster: boolean;
      options: any[];
      quantity: number;
      variantId: string;
    }[];
    variantOptions: any[];
    productId: string;
    variantId: string;
    brand: {
      id: string;
      image: string;
      name: string;
    };
    mainData: {
      name: string;
      shortDescription: string;
      variantMessage: string | null;
    };
    numberOfDiscounts: number;
    numberOfVariants: number;
    price: {
      currency: string;
      minimumPrice: number;
      minimumPriceWithoutVat: number;
    };
    sections: {
      id: string;
      link: string;
      name: string;
      order: number;
    }[];
    variantImages: {
      id: string;
      image: string;
      label: string;
    }[];
    MetaDataLocalValues: {
      Lang: string;
      LocalValues: {
        MetaDescription: string;
        MetaKeywords: string[];
        MetaTitle: string;
        Slug: string;
      };
    };
  };
  StatusCode: number;
  Message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  
  getProduct(productId: string, variantId: string, lang: string = 'ar'): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `https://products-service.hqoltech.com/product/${productId}/variant/${variantId}?lang=${lang}`
    );
  }
} 
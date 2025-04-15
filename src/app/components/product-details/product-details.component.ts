import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  ProductService,
  ProductResponse,
} from '../../services/product.service';
import { switchMap } from 'rxjs';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonList,
  IonThumbnail,
  IonButton,
  IonChip,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge,
    IonList,
    IonThumbnail,
    IonButton,
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private title = inject(Title);
  private meta = inject(Meta);
  private ngZone = inject(NgZone);

  product?: ProductResponse['Data'];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    // Wrap in NgZone to ensure proper change detection with Ionic components
    this.ngZone.run(() => {
      // Get product ID and variant ID from route parameters
      this.route.params
        .pipe(
          switchMap((params) => {
            const productId = params['productId'] || '1013'; // Default to 1013 if not provided
            const variantId = params['variantId'] || '1013'; // Default to 1013 if not provided
            return this.productService.getProduct(productId, variantId);
          })
        )
        .subscribe({
          next: (response) => {
            if (response.StatusCode === 0) {
              this.product = response.Data;
              this.isLoading = false;
              this.updateMetaTags(response.Data);
            } else {
              this.error = response.Message;
              this.isLoading = false;
            }
          },
          error: (err) => {
            this.error = 'Failed to load product data.';
            this.isLoading = false;
            console.error('Error fetching product:', err);
          },
        });
    });
  }

  private updateMetaTags(product: ProductResponse['Data']): void {
    // Set page title
    const metaTitle = product.MetaDataLocalValues.LocalValues.MetaTitle;
    this.title.setTitle(metaTitle);

    // Set meta description
    const metaDescription =
      product.MetaDataLocalValues.LocalValues.MetaDescription;
    this.meta.updateTag({ name: 'description', content: metaDescription });

    // Set Open Graph tags for better social sharing
    this.meta.updateTag({ property: 'og:title', content: metaTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: metaDescription,
    });

    // Set product image if available
    if (product.variantImages && product.variantImages.length > 0) {
      this.meta.updateTag({
        property: 'og:image',
        content: product.variantImages[0].image,
      });
    }

    // Set price metadata
    this.meta.updateTag({
      property: 'product:price:amount',
      content: product.price.minimumPrice.toString(),
    });
    this.meta.updateTag({
      property: 'product:price:currency',
      content: product.price.currency,
    });

    // Set additional metadata for SEO
    this.meta.updateTag({
      name: 'keywords',
      content: product.tags.map((tag) => tag.name).join(', '),
    });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({
      property: 'og:availability',
      content: product.availability,
    });
  }
}

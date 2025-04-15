import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'product/1013/1013', pathMatch: 'full' },
  { path: 'product/:productId/:variantId', component: ProductDetailsComponent },
  { 
    path: 'ionic-example', 
    loadComponent: () => import('./components/ionic-example/ionic-example.component').then(m => m.IonicExampleComponent) 
  }
];

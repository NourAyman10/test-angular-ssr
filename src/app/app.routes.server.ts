import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:productId/:variantId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([
      { productId: '1013', variantId: '1013' }
    ])
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

/**
 * Performance Optimization Component
 * Lazy load images and defer non-critical resources
 */

'use client';

import { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.src = img.dataset.src || img.src;
        }
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
    }

    // Prefetch important pages
    const prefetchPages = ['/dich-vu', '/du-an', '/lien-he'];
    prefetchPages.forEach((page) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

/**
 * Google Analytics Component
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    if (!measurementId) return;

    // Load GA script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize GA
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);
  }, [measurementId]);

  return null;
}

/**
 * Facebook Pixel Component
 */
export function FacebookPixel({ pixelId }: { pixelId: string }) {
  useEffect(() => {
    if (!pixelId) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);
  }, [pixelId]);

  return null;
}

/**
 * Zalo Chat Widget
 */
export function ZaloChatWidget({ zaloOAId }: { zaloOAId: string }) {
  useEffect(() => {
    if (!zaloOAId) return;

    const script = document.createElement('script');
    script.src = 'https://sp.zalo.me/plugins/sdk.js';
    document.body.appendChild(script);

    script.onload = () => {
      const widget = document.createElement('div');
      widget.className = 'zalo-chat-widget';
      widget.setAttribute('data-oaid', zaloOAId);
      widget.setAttribute('data-welcome-message', 'Xin chào! Chúng tôi có thể giúp gì cho bạn?');
      widget.setAttribute('data-autopopup', '0');
      widget.setAttribute('data-width', '350');
      widget.setAttribute('data-height', '420');
      document.body.appendChild(widget);
    };
  }, [zaloOAId]);

  return null;
}

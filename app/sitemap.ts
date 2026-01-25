import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://velimir-lux.ru'; // Change to actual domain
  
  const routes = [
    '',
    '/mebel-na-zakaz',
    '/stoly-epoksidnaya-smola',
    '/izdeliya-epoksidnaya-smola',
    '/shakhmaty-nardy-poker',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}

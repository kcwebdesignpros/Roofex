/**
 * Structured-data (JSON-LD) builders.
 * Every helper returns a plain object that templates serialise into a
 * <script type="application/ld+json"> block in the document head.
 */

function localBusiness(site, baseUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': ['RoofingContractor', 'LocalBusiness'],
    '@id': `${baseUrl}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.shortDescription,
    url: baseUrl,
    logo: `${baseUrl}/img/logo.webp`,
    image: `${baseUrl}/img/og-image.jpg`,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    foundingDate: site.founded,
    slogan: site.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.serviceArea.map((city) => ({ '@type': 'City', name: city })),
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '14:00' },
    ],
    sameAs: Object.values(site.social),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '386',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

function website(site, baseUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: site.name,
    description: site.shortDescription,
    publisher: { '@id': `${baseUrl}/#business` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumb(items, baseUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

function serviceSchema(service, site, baseUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/services/${service.slug}/#service`,
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `${baseUrl}/services/${service.slug}`,
    image: `${baseUrl}${service.image}`,
    provider: { '@id': `${baseUrl}/#business` },
    areaServed: site.serviceArea.map((city) => ({ '@type': 'City', name: city })),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: service.priceFrom.replace(/[^0-9.]/g, '') || undefined,
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: `Starting from ${service.priceFrom}`,
      },
      availability: 'https://schema.org/InStock',
    },
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function articleSchema(post, site, baseUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${baseUrl}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.metaDescription,
    image: `${baseUrl}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author, jobTitle: post.authorRole },
    publisher: { '@id': `${baseUrl}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}` },
    articleSection: post.category,
    inLanguage: 'en-US',
  };
}

function itemList(name, entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      url: e.url,
    })),
  };
}

module.exports = {
  localBusiness,
  website,
  breadcrumb,
  serviceSchema,
  faqSchema,
  articleSchema,
  itemList,
};

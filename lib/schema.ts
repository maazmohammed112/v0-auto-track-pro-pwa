export function getApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AutoTrackPro',
    description: 'Personal vehicle management app for tracking fuel, service, expenses, and mileage across multiple vehicles',
    applicationCategory: 'UtilityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    operatingSystem: [
      'Web',
      'iOS',
      'Android',
    ],
    featureList: [
      'Fuel tracking and mileage calculation',
      'Service reminder management with km-based alerts',
      'Multi-vehicle expense tracking',
      'Detailed insights and analytics',
      'Offline-first PWA functionality',
      'Smart odometer tracking',
    ],
  }
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AutoTrackPro',
    url: 'https://autotrackpro.com',
    description: 'Vehicle management and expense tracking platform',
    sameAs: [
      'https://github.com',
      'https://twitter.com/autotrackpro',
    ],
  }
}

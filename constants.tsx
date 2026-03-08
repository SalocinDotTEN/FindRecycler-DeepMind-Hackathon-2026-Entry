
import { RecyclingFacility } from './types';

export const INITIAL_FACILITIES: RecyclingFacility[] = [
  {
    id: '1',
    name: 'KL Sentral near Starbucks',
    address: 'Starbucks KL Sentral',
    location: { lat: 3.1344, lng: 101.6861 },
    materials: ['Textiles', 'Paper'],
    type: 'Drop-off',
    description: 'Charity bin located near Starbucks in KL Sentral.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/auGACjPiojFKHxvBMlRU.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '2',
    name: 'Opposite Collective Central',
    address: 'Durr Systems Malaysia Sdn Bhd',
    location: { lat: 3.0912, lng: 101.5641 },
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    type: 'Drop-off',
    description: 'Recycling bins located opposite Collective Central.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/OBxmmh8Ijmkxt6K9hjAY.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '3',
    name: '1 Utama',
    address: '1 Utama Shopping Centre',
    location: { lat: 3.1478, lng: 101.6159 },
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    type: 'Drop-off',
    description: 'Recycling bins at 1 Utama Shopping Centre.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/BT8N4dalH92c5ZwTAsBN.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '4',
    name: 'Setia City Mall',
    address: 'Setia City Mall',
    location: { lat: 3.1105, lng: 101.4614 },
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    type: 'Drop-off',
    description: 'Recycling bins at Setia City Mall.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/bHBnbRZxHXSuBKMuIMI3.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '5',
    name: 'All IT Hypermarket at Digital Mall Seksyen 17',
    address: 'Digital Mall',
    location: { lat: 3.1097, lng: 101.6365 },
    materials: ['E-Waste', 'Batteries'],
    type: 'Drop-off',
    description: 'Recycling bins for e-waste at Digital Mall.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/yK8qCvMNQsCXP2QTaisg.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '6',
    name: 'Publika Mall',
    address: 'Publika Shopping Gallery',
    location: { lat: 3.1714, lng: 101.6663 },
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    type: 'Drop-off',
    description: 'Recycling bins at Publika.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/VrGADTL3AaGoD04n67Dl.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '7',
    name: 'SRK DJ',
    address: 'Jalan SS 22/47, Seksyen 22, Damansara Jaya, 47400 Petaling Jaya, Selangor, Malaysia',
    location: { lat: 3.1275, lng: 101.6167 },
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    type: 'Center',
    description: 'Collection centre at SRK Damansara Jaya.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/9FB5iKfvBRFtQf9UXzrM.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '8',
    name: 'Centrepoint Bandar Utama',
    address: 'Centrepoint Bandar Utama',
    location: { lat: 3.1385, lng: 101.6108 },
    materials: ['Textiles', 'Paper'],
    type: 'Drop-off',
    description: 'Charity bin at Centrepoint Bandar Utama.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/qJ94hwy2x7ex8ia9FvNk.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '9',
    name: 'DJ ROA Centre',
    address: 'Djroa Centre',
    location: { lat: 3.1280, lng: 101.6150 },
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    type: 'Center',
    description: 'Collection centre at DJ ROA.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/q8AzBtrw8lQteVYL51lA.jpg',
    status: 'approved',
    reviews: []
  },
  {
    id: '10',
    name: 'KL Eco City',
    address: 'KL Eco City',
    location: { lat: 3.1174, lng: 101.6738 },
    materials: ['Textiles', 'Paper'],
    type: 'Drop-off',
    description: 'Charity bin at KL Eco City.',
    imageUrl: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/IzxPtXbdCRJ3Zsjmcl7S.jpg',
    status: 'approved',
    reviews: []
  }
];

export const MATERIAL_TYPES = [
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'E-Waste',
  'Batteries',
  'Textiles',
  'Organic'
];

export const LOGO_URL = 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/rVSSpLnw5RkDoZYeHVID/pub/zfOqF4fTMuAp2i73x4U0.png';

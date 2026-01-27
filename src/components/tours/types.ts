// Tour Detail Types

export interface TourHighlight {
  icon: string;
  title: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  location?: string;
  accommodation?: string;
  meals?: string;
  highlights?: string[];
  image?: string;
  isFeatured?: boolean;
}

export interface TourData {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  overview: string;
  duration: number;
  durationText: string;
  parks: number;
  gameDrives: number;
  rating: number;
  reviewCount: number;
  price: number;
  heroImage: string;
  badges: string[];
  highlights: TourHighlight[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit?: { period: string; description: string }[];
}

export interface BookingFormData {
  date: string;
  travelers: number;
  safariType: 'private' | 'group';
  email: string;
}

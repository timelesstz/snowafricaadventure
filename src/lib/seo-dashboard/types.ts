export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;
}

export interface OverviewMetrics {
  totalClicks: number;
  totalImpressions: number;
  avgPosition: number;
  avgCtr: number;
  clicksTrend: number; // percentage change vs prior period
  impressionsTrend: number;
  positionTrend: number;
  ctrTrend: number;
  healthScore: number; // 0-100
  lastSyncAt: Date | null;
}

export interface TopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface TopPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface TimeSeriesPoint {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface OrganicTimeSeriesPoint {
  date: string;
  sessions: number;
  users: number;
  bounceRate: number;
}

export interface AuditIssue {
  severity: "critical" | "warning" | "info" | "pass";
  field: string;
  message: string;
  value?: string | number;
}

export interface AuditResult {
  url: string;
  score: number;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescLength: number;
  h1Count: number;
  h1Text: string | null;
  h2Count: number;
  h3Count: number;
  wordCount: number;
  hasCanonical: boolean;
  canonicalUrl: string | null;
  hasSchema: boolean;
  schemaTypes: string[];
  internalLinks: number;
  externalLinks: number;
  imagesTotal: number;
  imagesMissingAlt: number;
  issues: AuditIssue[];
}

export interface Recommendation {
  id: string;
  severity: "critical" | "warning" | "info";
  category: string;
  title: string;
  description: string;
  affectedUrl?: string;
  metric?: string;
}

export interface KeywordWithPosition {
  id: string;
  keyword: string;
  targetUrl: string | null;
  isActive: boolean;
  currentPosition: number | null;
  bestPosition: number | null;
  clicks: number;
  impressions: number;
  positionHistory: { date: string; position: number }[];
}

export interface ContentPerformanceItem {
  id: string;
  title: string;
  slug: string;
  publishedAt: Date | null;
  wordCount: number;
  clicks: number;
  impressions: number;
  avgPosition: number;
  seoScore: number | null;
  status: "good" | "needs-attention" | "poor";
}

export interface SeoSettings {
  gscSiteUrl: string | null;
  ga4PropertyId: string | null;
  isGscConnected: boolean;
  isGa4Connected: boolean;
  serviceAccountEmail: string | null;
}

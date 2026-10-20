export interface DomainMetricResult {
  domain: string;
  rawDomain: string;
  da: number;
  pa: number;
  ss: string;
  ssNum: number;
  dr: number;
  mt: number;
  mr: number;
  backlink: string;
  backlinksRaw?: number;
  umurDomain: string;
  umurDetails?: {
    years: number;
    months: number;
    days: number;
  };
  nofollow: string;
  redirect: string;
  deleted: string;
  daftar: string;
  expired: string;
  ip?: string;
  registrar?: string;
  nameservers?: string[];
  ssl?: boolean;
  httpStatus?: number;
  responseTimeMs?: number;
  checkedAt: string;
}

export interface AdSenseConfig {
  enabled: boolean;
  client: string;
  topSlot: string;
  inToolSlot: string;
  sidebarSlot: string;
  inFeedSlot: string;
  previewMode: boolean;
}

export interface AffiliateBannerConfig {
  text: string;
  url: string;
  highlightText?: string;
}

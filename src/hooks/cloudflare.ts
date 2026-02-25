import { useQuery } from "@tanstack/react-query";

import {
  fetchWebAnalyticsAggregate,
  fetchWebAnalyticsBrowser,
  fetchWebAnalyticsOS,
  fetchWebAnalyticsSparkline,
} from "@/lib/api";

// Helper function to round dates to nearest 5 minutes for query key stability
// This prevents unnecessary refetches when the same time range is selected
function getRoundedQueryKey(from: Date, to: Date): string {
  const roundToFiveMinutes = (date: Date): number => {
    const ms = date.getTime();
    return Math.floor(ms / (5 * 60 * 1000)) * (5 * 60 * 1000);
  };

  return `${roundToFiveMinutes(from)}-${roundToFiveMinutes(to)}`;
}

export function useFetchWebAnalyticsAggregate(from: Date, to: Date) {
  const query = useQuery({
    queryKey: ["webAnalytics", "aggregate", getRoundedQueryKey(from, to)],
    queryFn: () => fetchWebAnalyticsAggregate(from, to),
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Cache persists for 30 minutes
  });

  return query;
}

export function useFetchWebAnalyticsBrowser(from: Date, to: Date) {
  const query = useQuery({
    queryKey: ["webAnalytics", "browser", getRoundedQueryKey(from, to)],
    queryFn: () => fetchWebAnalyticsBrowser(from, to),
    staleTime: 15 * 60 * 1000, // Data is fresh for 15 minutes
    gcTime: 15 * 60 * 1000, // Cache persists for 15 minutes
  });

  return query;
}

export function useFetchWebAnalyticsOS(from: Date, to: Date) {
  const query = useQuery({
    queryKey: ["webAnalytics", "os", getRoundedQueryKey(from, to)],
    queryFn: () => fetchWebAnalyticsOS(from, to),
    staleTime: 15 * 60 * 1000, // Data is fresh for 15 minutes
    gcTime: 15 * 60 * 1000, // Cache persists for 15 minutes
  });

  return query;
}

export function useFetchWebAnalyticsSparkline(from: Date, to: Date) {
  const query = useQuery({
    queryKey: ["webAnalytics", "sparkline", getRoundedQueryKey(from, to)],
    queryFn: () => fetchWebAnalyticsSparkline(from, to),
    staleTime: 15 * 60 * 1000, // Data is fresh for 15 minutes
    gcTime: 15 * 60 * 1000, // Cache persists for 15 minutes
  });

  return query;
}
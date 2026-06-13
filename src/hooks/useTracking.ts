import { useQuery } from '@tanstack/react-query';
import type { TrackingData } from '@/types';

async function fetchTracking(uuid: string): Promise<TrackingData> {
  const res = await fetch(`/api/track/${uuid}`);
  if (!res.ok) throw new Error('Failed to fetch tracking data');
  return res.json();
}

export function useTracking(uuid: string) {
  return useQuery({
    queryKey: ['tracking', uuid],
    queryFn: () => fetchTracking(uuid),
    refetchInterval: 10000, // Poll every 10 seconds for live updates
    enabled: !!uuid,
  });
}

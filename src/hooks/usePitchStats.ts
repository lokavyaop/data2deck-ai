import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PitchStats {
  totalPitches: number;
  totalValue: number;
  totalViews: number;
  completedPitches: number;
  inProgressPitches: number;
  conversionRate: number;
  propertyTypes: Record<string, number>;
  recentPitches: Array<{
    id: string;
    title: string;
    propertyName: string;
    location: string;
    value: number;
    status: string;
    views: number;
    createdAt: string;
  }>;
  weeklyData: Array<{
    day: string;
    views: number;
  }>;
  lastUpdated: string;
}

export const usePitchStats = () => {
  const [stats, setStats] = useState<PitchStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase.functions.invoke("pitch-stats");

      if (fetchError) {
        throw fetchError;
      }

      setStats(data);
    } catch (err) {
      console.error("Error fetching pitch stats:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
      
      // Set fallback mock data for preview
      setStats({
        totalPitches: 12,
        totalValue: 87700000,
        totalViews: 1847,
        completedPitches: 8,
        inProgressPitches: 4,
        conversionRate: 24,
        propertyTypes: {
          commercial: 5,
          residential: 3,
          "mixed-use": 2,
          hospitality: 1,
          industrial: 1,
        },
        recentPitches: [
          { id: "1", title: "Manhattan Luxury Condo", propertyName: "Park Avenue Towers", location: "New York, NY", value: 24500000, status: "completed", views: 156, createdAt: new Date().toISOString() },
          { id: "2", title: "Miami Beach Resort", propertyName: "Ocean Vista Resort", location: "Miami, FL", value: 18200000, status: "in_progress", views: 89, createdAt: new Date().toISOString() },
          { id: "3", title: "SF Tech Campus", propertyName: "Bay Innovation Hub", location: "San Francisco, CA", value: 45000000, status: "completed", views: 234, createdAt: new Date().toISOString() },
        ],
        weeklyData: [
          { day: "Mon", views: 221 },
          { day: "Tue", views: 277 },
          { day: "Wed", views: 240 },
          { day: "Thu", views: 332 },
          { day: "Fri", views: 258 },
          { day: "Sat", views: 369 },
          { day: "Sun", views: 148 },
        ],
        lastUpdated: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};

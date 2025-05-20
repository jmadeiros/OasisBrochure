'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Only run on client-side
    if (!analytics) return;
    
    // Log page view when the component mounts
    logEvent(analytics, 'page_view');
    
    // You can add more tracking here as needed
  }, []);

  // This component doesn't render anything
  return null;
} 
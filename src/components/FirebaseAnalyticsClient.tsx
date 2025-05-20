"use client";

import dynamic from 'next/dynamic';

const FirebaseAnalytics = dynamic(
  () => import('@/components/FirebaseAnalytics'),
  { ssr: false }
);

export default FirebaseAnalytics; 
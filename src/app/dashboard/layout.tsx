'use client';
import { LAYOUT_OPTIONS } from '@/config/constants';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/main/layout';
import { useIsMounted } from '@/hooks/use-is-mounted';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  
  return <HydrogenLayout>{children}</HydrogenLayout>;
}

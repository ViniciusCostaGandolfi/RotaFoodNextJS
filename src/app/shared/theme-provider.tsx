'use client';

import { siteConfig } from '@/config/site.config';
import { useApplyColorPreset } from '@/hooks/use-theme-color';
import hideRechartsConsoleError from '@/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  useApplyColorPreset();
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={'ligth'}
    >
      {children}
    </NextThemeProvider>
  );
}

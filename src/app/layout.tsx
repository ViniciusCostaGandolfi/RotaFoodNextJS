
import { inter, lexendDeca } from '@/app/fonts';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import cn from '@/utils/class-names';
import { getServerSession } from 'next-auth/next';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import iconPath from '@public/images/RotaFoodIcone.png'

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
// styles
import '@/app/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: iconPath,
  viewport: { width: 'device-width', initialScale: 1 },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
          <ThemeProvider>
            <NextProgress />
            {children}
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
      </body>
    </html>
  );
}

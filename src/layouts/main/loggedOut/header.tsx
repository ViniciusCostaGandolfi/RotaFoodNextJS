'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ActionIcon } from '@/components/ui/action-icon';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import HamburgerButton from '@/layouts/hamburger-button';
import cn from '@/utils/class-names';
import Logo from '@/components/logo';
import { loggedOutMenuItems } from './menu-items';
import { usePathname } from 'next/navigation';
import Sidebar from '../loggedIn/sidebar';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';

function HeaderMenuTop() {
  const pathname = usePathname();
  return (
    <div className='hidden sm:flex 	'>
      <div className="ms-auto grid shrink-0 grid-cols-3 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
        {loggedOutMenuItems.map((item, index) => {
          const isActive = pathname === (item?.href as string);
          return (
            <div key={index}>
              <Link
                  href={item?.href}
                  className={cn(
                    'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                    isActive
                      ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                      : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                  )}
                >
                  {item?.icon && (
                    <span
                      className={cn(
                        'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                        isActive
                          ? 'text-primary'
                          : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                      )}
                    >
                      {item?.icon}
                    </span>
                  )}
                  {item.name}
                </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex items-center justify-between bg-gray-0/80 rounded-2xl px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10',
        ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
      )}
    >
      <Link href={'/'} className='w-full sm:w-2/3 pr-4'>
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              priority
        />
      </Link>
      <HeaderMenuTop />
      <div className="flex w-auto sm:w-full items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
      </div>
    </header>
  );
}

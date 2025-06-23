'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="bg-transparent text-white border border-white/30 rounded-md py-1 px-2 appearance-none cursor-pointer"
      >
        <option value="it" className="bg-black">IT</option>
        <option value="en" className="bg-black">EN</option>
      </select>
    </div>
  );
} 
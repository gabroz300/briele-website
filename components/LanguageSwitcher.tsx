'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const newPath = pathname.startsWith(`/${locale}`) ? pathname.substring(`/${locale}`.length) : pathname;
    window.location.href = `/${nextLocale}${newPath || '/'}`;
  };

  return (
    <div className="relative">
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        className="bg-transparent text-white border border-white/30 rounded-md py-1 px-2 appearance-none cursor-pointer"
      >
        <option value="it" className="bg-black">IT</option>
        <option value="en" className="bg-black">EN</option>
      </select>
    </div>
  );
} 
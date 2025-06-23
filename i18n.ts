import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {AbstractIntlMessages} from 'next-intl';

// Can be imported from a shared config
const locales = ['en', 'it'];

export default getRequestConfig(async ({locale = 'it'}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default as AbstractIntlMessages
  };
}); 
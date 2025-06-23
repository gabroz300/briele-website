import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'it'],
  defaultLocale: 'it',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 
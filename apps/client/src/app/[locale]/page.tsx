import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Code } from '@repo/ui/code';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const technologies = [
    { name: t('home.tech.nextjs'), status: 'active' },
    { name: t('home.tech.nestjs'), status: 'active' },
    { name: t('home.tech.turborepo'), status: 'active' },
    { name: t('home.tech.prisma'), status: 'active' },
    { name: t('home.tech.tailwind'), status: 'active' },
    { name: t('home.tech.i18n'), status: 'active' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12 bg-background text-foreground">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
          {t('home.title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('home.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Module Status Section */}
        <div className="p-6 border rounded-xl bg-card shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            {t('home.status')}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">@repo/i18n</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                {t('home.verified')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">@repo/ui</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                {t('home.verified')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">@repo/data</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                {t('home.verified')}
              </span>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="p-6 border rounded-xl bg-card shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold">
            {t('home.techStack')}
          </h2>
          <ul className="grid grid-cols-1 gap-2">
            {technologies.map((tech) => (
              <li key={tech.name} className="flex items-center gap-2 text-muted-foreground">
                <Code className="text-primary font-bold">✔</Code>
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <Button size="lg">{t('common.welcome')}</Button>
        <Button variant="outline" size="lg">
          <a href="/api" target="_blank">View API Docs</a>
        </Button>
      </div>

      <footer className="mt-12 text-sm text-muted-foreground">
        <p>Monorepo v1.0.0 - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

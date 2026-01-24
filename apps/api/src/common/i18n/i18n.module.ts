import { createRequire } from 'node:module';
import * as path from 'path';

import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        // Resolve the package path robustly (without assuming folder structure)
        // This keeps the single source of truth in @repo/i18n/src/locales
        path: path.dirname(
          createRequire(__filename).resolve('@repo/i18n/locales/es.json'),
        ),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
})
export class AppI18nModule {}

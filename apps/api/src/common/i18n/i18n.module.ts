import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { createRequire } from 'node:module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        // Resolvemos la ruta del paquete de forma robusta (sin asumir estructura de carpetas)
        // Esto mantiene la fuente única de verdad en @repo/i18n/src/locales
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

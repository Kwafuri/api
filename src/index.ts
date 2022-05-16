/*
 * Copyright (c) 2020 genshin.dev
 * Licensed under the Open Software License version 3.0
 */
import Koa from 'koa';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import * as Sentry from '@sentry/node';
import chalk from 'chalk';

import router from './routes';

const sentryDsn = process.env.SENTRY_DSN;

// Check if Sentry
if (sentryDsn && sentryDsn.length > 0) {
  console.log(chalk.blue('[Sentry]'), 'Enabled Sentry error logging');
  Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 0.5,
  });
}

(async () => {
  const max = 50000;
  const min = 30000;
  const port = Math. floor(Math. random() * (max - min + 1)) + min;
  const app = new Koa();

  app.use(koaBody());
  app.use(helmet());
  app.use(cors());

  app.use(router.routes());

  app.listen(port, () => {
    console.log(
      chalk.blue('[API]'),
      'Running on',
      chalk.yellow(`0.0.0.0:${port}`),
    );
  });
})();

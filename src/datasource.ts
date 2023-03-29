// eslint-disable-next-line node/no-unpublished-import
import { config as useDotEnv } from '@deeepvision/dotenv-yaml';
import { DataSource } from 'typeorm';

useDotEnv();

import { DbConfig } from './config';

/**
 * DataSource is used for cli scripts like `typeorm migration:*`
 * @see https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md
 */
export const dataSource = new DataSource(DbConfig());

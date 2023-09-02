import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceConfig } from './data-source.config';

const migrationDataSourceConfig: DataSourceOptions = {
  ...dataSourceConfig,
  migrations: ['migrations/*.ts'],
};

export default new DataSource(migrationDataSourceConfig);

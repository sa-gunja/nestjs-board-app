import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from '../../node_modules/config';

const db = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: db.type,
  host: process.env.RDS_HOST || db.host,
  port: process.env.RDS_PORT || db.port,
  username: process.env.RDS_USERNAME || db.username,
  password: process.env.RDS_PASSWORD || db.password,
  database: process.env.RDS_DATABASE || db.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: db.synchronize,
  autoLoadEntities: true,
};

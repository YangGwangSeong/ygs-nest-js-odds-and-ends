import { INestApplication } from '@nestjs/common';
import { EntityManager } from 'typeorm';

export const ClearDatabase = async (app: INestApplication): Promise<void> => {
  const entityManager = app.get<EntityManager>(EntityManager);
  const tableNames = entityManager.connection.entityMetadatas
    .map((entity) => entity.tableName)
    .join(', ');

  await entityManager.query(`truncate ${tableNames} restart identity cascade;`);
};

import { pgTable, bigint, text, uuid, bigserial, primaryKey, integer } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const user = pgTable('User', {
  uuid: integer('uuid').primaryKey(),
  name: text('name').notNull(),
  photo: text('photo'),
});
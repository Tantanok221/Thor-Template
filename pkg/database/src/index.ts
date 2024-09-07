import { and, AnyColumn, asc, Column, desc, eq, ilike, isNotNull, not, SQL, SQLWrapper } from "drizzle-orm";
import { PgSelect } from "drizzle-orm/pg-core";
import { s } from "./db/index.js";

export function BuildQuery<T extends PgSelect>(query: T){
  return new SelectDatabaseQueryBuilder(query);
}

export function createPaginationObject<T>(
  data: T,
  currentPage: number,
  pageSize: number,
  totalCount: number
) {
  const totalPage = Math.ceil(totalCount / pageSize);
  return {
    data,
    totalCount,
    totalPage,
    nextPageAvailable: currentPage < totalPage,
    previousPageAvailable: currentPage > 1,
    pageSize,
  };
}


class SelectDatabaseQueryBuilder<T extends PgSelect> {
  query: T;
  constructor(query: T) {
    this.query = query;
  }
  withOrderBy(sortBy: typeof asc | typeof desc, table: AnyColumn | SQLWrapper) {
    this.query = this.query.orderBy(sortBy(table));
    return this
  }
  withPagination(page: number, size: number ) {
    this.query = this.query.limit(size).offset((page - 1) * size);
    return this
  }
  withIlikeSearchByTable(search: string, table: Column) {
    this.query = this.query.where(and(ilike(table, search)));
    return this
  }
  withTableIsNotNull(table: Column){
    this.query = this.query.where(isNotNull(table))
    return this
  }
  withTableIsNot(table:Column, value: number|string){
    this.query = this.query.where(not(eq(table, value)))
    return this
  }
  withAndFilter( filter: (SQLWrapper|undefined)[] ){
    this.query = this.query.where(and(... filter))
    return this
  }
  withFilter( filter: SQL ){
    this.query = this.query.where(filter)
    return this
  }
  Build(){
    return new SelectDatabaseQueryBuilder(this.query);
  }
}

import {
  Connection,
  createConnection,
  ConnectionOptions,
  EntitySchema,
} from 'typeorm';

export class TypeORM {
  private conn!: Connection;
  private readonly config: ConnectionOptions;
  private readonly entities: Array<EntitySchema>;

  /**
   * Creates a new Database instance
   * @param config The connection options to use
   */
  constructor(config: ConnectionOptions) {
    this.config = config;
    this.entities = [];
  }

  /**
   * Adds an entity to the database
   * @param entity The entity class to add
   */
  add(entity: EntitySchema) {
    if (!this.entities.includes(entity)) this.entities.push(entity);
  }

  /**
   * Removes an entity from the database
   * @param entity The entity class to remove
   */
  remove(entity: EntitySchema) {
    if (this.entities.includes(entity)) {
      const index = this.entities.findIndex(e => e === entity);
      this.entities.splice(index, 1);
    }
  }

  /**
   * Returns a repository based on a entity
   * @param entity The entity to get the repository of
   */
  repository(entity: EntitySchema) {
    if (this.conn) return this.conn.getRepository(entity);
    else return null;
  }

  /**
   * Initializes a new connection to the database
   */
  async connect() {
    this.conn = await createConnection({
      entities: this.entities,
      ...this.config,
    });
  }
}

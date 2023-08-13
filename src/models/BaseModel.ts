import { type EntityManager, Property } from '@mikro-orm/core'

export abstract class BaseModel {
  @Property({ type: 'string', defaultRaw: 'CURRENT_TIMESTAMP(1)' })
    created_at?: string

  @Property({ type: 'string', defaultRaw: 'CURRENT_TIMESTAMP(1)' })
    updated_at?: string

  public async save (em: EntityManager): Promise<void> {
    await em.persistAndFlush(this)
  }
}

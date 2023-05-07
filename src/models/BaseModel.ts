import { EntityManager, Property } from "@mikro-orm/core";
// import { app } from "../app";
// import type { Item } from "./Item";
// import type { Production } from "./Production";
// import type { ProductionHistory } from "./ProductionHistory";
// import type { ProductionStatus } from "./ProductionStatus";
// import type { EventType } from "./EventType";
// import config from "../config/mikro-orm.config";
 


export abstract class BaseModel {
  @Property({ type: 'string', defaultRaw: "CURRENT_TIMESTAMP(1)" })
    created_at?:string;

  @Property({ type: 'string', defaultRaw: "CURRENT_TIMESTAMP(1)" })
    updated_at?: string;

  public async save(em: EntityManager): Promise<void> {
    await em.persistAndFlush(this);
  }
}
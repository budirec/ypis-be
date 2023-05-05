import { Property } from "@mikro-orm/core";
import { app } from "../app";


export abstract class BaseModel {
  @Property({ type: 'string', defaultRaw: "CURRENT_TIMESTAMP(1)" })
    created_at?:string;

  @Property({ type: 'string', defaultRaw: "CURRENT_TIMESTAMP(1)" })
    updated_at?: string;

  public async save(): Promise<void> {
    return app.orm.em.  persistAndFlush(this);
  }
}
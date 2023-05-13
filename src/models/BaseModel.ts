import { MikroORM, Property } from "@mikro-orm/core";

import { inject, injectable } from "inversify";

@injectable()
export class BaseModel {
  @inject('MikroORM') private _orm: MikroORM;
  @Property({ type: 'string', defaultRaw: "CURRENT_TIMESTAMP(1)" })
    created_at?:string;

  @Property({ type: 'string', defaultRaw: "CURRENT_TIMESTAMP(1)" })
    updated_at?: string;

  public async save(): Promise<void> {
    console.log(this._orm);
    return this._orm.em.persistAndFlush(this);
  } 
}
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BankClientRelation } from "./BankClientRelation";

@Index("client_pkey", ["id"], { unique: true })
@Entity("client", { schema: "public" })
export class Client {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @OneToMany(
    () => BankClientRelation,
    (bankClientRelation) => bankClientRelation.client
  )
  bankClientRelations: BankClientRelation[];
}

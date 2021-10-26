import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BankClientRelation } from "./BankClientRelation";

@Index("bank_pkey", ["id"], { unique: true })
@Entity("bank", { schema: "public" })
export class Bank {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @OneToMany(
    () => BankClientRelation,
    (bankClientRelation) => bankClientRelation.bank
  )
  bankClientRelations: BankClientRelation[];
}

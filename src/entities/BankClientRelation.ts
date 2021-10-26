import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bank } from "./Bank";
import { Client } from "./Client";

@Index("bank_id_client_id_uk", ["bankId", "clientId"], { unique: true })
@Index("bank_client_relation_pkey", ["id"], { unique: true })
@Entity("bank_client_relation", { schema: "public" })
export class BankClientRelation {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "bank_id", unique: true })
  bankId: number;

  @Column("integer", { name: "client_id", unique: true })
  clientId: number;

  @ManyToOne(() => Bank, (bank) => bank.bankClientRelations, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "bank_id", referencedColumnName: "id" }])
  bank: Bank;

  @ManyToOne(() => Client, (client) => client.bankClientRelations, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Client;
}

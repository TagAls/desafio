import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

@Entity()
export class Categoria {
  @PrimaryColumn()
  id: string;
  @Column()
  nome: string;
  @Column({ type: 'decimal' })
  juros: number;

  constructor(props: { nome: string; juros: number }, id?: string) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}

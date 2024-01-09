import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

@Entity()
export class Categoria {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: false })
  nome: string;
  @Column({ type: 'decimal', nullable: false })
  juros: number;

  constructor(props: { nome: string; juros: number }, id?: string) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}

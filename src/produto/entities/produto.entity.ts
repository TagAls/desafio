import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

@Entity()
export class Produto {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: false })
  nome: string;
  @Column({ nullable: false })
  descricao: string;
  @Column({ nullable: false })
  valor: number;
  @Column({ nullable: false })
  idCategoria: string;

  constructor(
    props: {
      nome: string;
      descricao: string;
      valor: number;
      idCategoria: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}

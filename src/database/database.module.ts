import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Produto, Categoria],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

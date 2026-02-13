import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static'; // 1. Import this
import { join } from 'path'; // 2. Import this

import { PatientModule } from './patient/patient.module';
import { ImagesModule } from './images/images.module';
import { VisitModule } from './visits/visit.module';

@Module({
  imports: [
    // 3. Add this configuration
ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public', 'browser'),
  exclude: ['/api/(.*)'],
}),


    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),

    PatientModule,
    VisitModule,
    ImagesModule,
  ],
})
export class AppModule {}

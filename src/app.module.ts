//check
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient/patient.entity';
import { PatientModule } from './patient/patient.module';
import { ImagesModule } from './images/images.module';
import { Visit } from './visits/visit.entity';
import { VisitImage } from './visits/visit-image.entity';
import { VisitModule } from './visits/visit.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
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




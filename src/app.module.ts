import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient/patient.entity';
import { PatientModule } from './patient/patient.module';
import { ImagesModule } from './images/images.module';
import { Visit } from './visits/visit.entity';
import { VisitImage } from './visits/visit-image.entity';
import { VisitModule } from './visits/visit.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'eye_clinic',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PatientModule,
	    VisitModule, 
    ImagesModule,
  ],
})
export class AppModule {}



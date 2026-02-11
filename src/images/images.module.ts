//import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { Image } from './image.entity';
//import { ImagesService } from './images.service';
//import { ImagesController } from './images.controller';
//import { Patient } from '../patient/patient.entity';

//@Module({
 // imports: [TypeOrmModule.forFeature([Image, Patient])],
 // providers: [ImagesService],
 // controllers: [ImagesController],
//})
//export class ImagesModule {}



import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import { Patient } from '../patient/patient.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Patient]),
    MulterModule.register({
      dest: './uploads', // ← files go here
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}

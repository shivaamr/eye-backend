import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitImage } from './visit-image.entity';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit, VisitImage]),
  ],
  controllers: [VisitController],
  providers: [VisitService],
  exports: [TypeOrmModule], // 🔥 IMPORTANT
})
export class VisitModule {}

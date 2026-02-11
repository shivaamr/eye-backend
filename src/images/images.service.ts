import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { Patient } from '../patient/patient.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepo: Repository<Image>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

async saveImages(patientId: number, imageUrls: string[]) {
  const patient = await this.patientRepo.findOneBy({ id: patientId });
  if (!patient) throw new Error('Patient not found');

  const images = imageUrls.map(url =>
    this.imageRepo.create({ imageUrl: url, patient }),
  );

  return this.imageRepo.save(images);
}

async getImagesByPatient(patientId: number) {
  return this.imageRepo.find({
    where: { patient: { id: patientId } },
    order: { createdAt: 'DESC' }, // optional: newest first
  });
}


}


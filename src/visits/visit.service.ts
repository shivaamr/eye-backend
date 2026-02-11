import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { VisitImage } from './visit-image.entity';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepo: Repository<Visit>,

    @InjectRepository(VisitImage)
    private imageRepo: Repository<VisitImage>,
  ) {}

  // Create a new visit
  async createVisit(visitData: any) {
    const visit = this.visitRepo.create({
      ...visitData,
      patient: { id: visitData.patientId }, // map patient relation
    });

    return this.visitRepo.save(visit);
  }

  // Save uploaded images
 async saveImages(visitId: number, files: Express.Multer.File[]) {
  const visit = await this.visitRepo.findOne({ where: { id: visitId } });
  if (!visit) throw new NotFoundException('Visit not found');

  // ✅ Create folder if it doesn't exist
  const visitFolder = './uploads/visit_images';
  if (!fs.existsSync(visitFolder)) fs.mkdirSync(visitFolder, { recursive: true });

  // ✅ Move files from temp upload folder to visit_images folder
  files.forEach(file => {
    const newPath = path.join(visitFolder, file.filename);
    fs.renameSync(file.path, newPath); // file.path comes from Multer
    file.path = newPath; // update file.path so DB gets correct path
  });

  // ✅ Save file info to DB
  const images = files.map(file =>
    this.imageRepo.create({
      filePath: file.path, // now points to visit_images folder
      visit,
    }),
  );

  return this.imageRepo.save(images);
}
async getVisitWithImages(visitId: number) {
  const visit = await this.visitRepo.findOne({
    where: { id: visitId },
    relations: ['images', 'patient'], // include images and patient info
  });
  if (!visit) throw new NotFoundException('Visit not found');
  return visit;
}

// Get all visits with images
async getAllVisitsWithImages() {
return this.visitRepo.find({
  relations: ['images', 'patient'],
  order: { visitDate: 'DESC' },
});

}


async deleteVisit(id: number) {
    // 1️⃣ Find the visit with images
    const visit = await this.visitRepo.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!visit) {
      throw new NotFoundException('Visit not found');
    }

    // 2️⃣ Delete images from disk
    if (visit.images && visit.images.length > 0) {
      for (const image of visit.images) {
        if (fs.existsSync(image.filePath)) {
          fs.unlinkSync(image.filePath); // remove the file
        }
      }

      // 3️⃣ Delete images from DB
      await this.imageRepo.delete({ visit: { id } });
    }

    // 4️⃣ Delete the visit itself
    await this.visitRepo.delete(id);

    return { message: 'Visit and associated images deleted successfully' };
  }



}

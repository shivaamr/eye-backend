
import { Controller, Post, Body, UploadedFiles, UseInterceptors, Get, Param  } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images')) // ← must match FormData key
  uploadImages(
    @Body('patientId') patientId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('Uploaded files:', files); // check if files arrive
    const imageUrls = files.map(file => `/uploads/${file.filename}`);
    return this.imagesService.saveImages(patientId, imageUrls);
  }
  
    @Get('patient/:id')
  async getPatientImages(@Param('id') patientId: number) {
    return this.imagesService.getImagesByPatient(patientId);
  }
  
}


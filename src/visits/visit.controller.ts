import { Controller, Post, UseInterceptors, UploadedFiles, Body, NotFoundException, Get, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VisitService } from './visit.service';

@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  createVisit(@Body() visitData: any) {
    return this.visitService.createVisit(visitData);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, { // max 10 files
      storage: diskStorage({
        destination: './uploads/visit_images',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
    }),
  )
  uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('visitId') visitId: number,
  ) {
    return this.visitService.saveImages(visitId, files);
  }
  
  
  @Get(':id')
  getVisit(@Param('id') id: number) {
    return this.visitService.getVisitWithImages(id);
  }

  // Get all visits with images
  
  @Get()
async getAllVisits() {
  return this.visitService.getAllVisitsWithImages();
}

@Get('debug')
async debugVisits() {
  const visits = await this.visitService.getAllVisitsWithImages();
  console.log(visits);
  return visits;
}

  @Delete(':id')
  async deleteVisit(@Param('id') id: string) {
    return this.visitService.deleteVisit(+id);
  }
  
  
}

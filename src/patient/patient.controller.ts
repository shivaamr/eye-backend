import { Controller, Post, Body, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // POST /patient
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  // GET /patient
  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }
}


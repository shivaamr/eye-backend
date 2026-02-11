import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity('patient_images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string; // or imagePath

  @ManyToOne(() => Patient, patient => patient.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @CreateDateColumn()
  createdAt: Date;
}

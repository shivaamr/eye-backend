import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { VisitImage } from './visit-image.entity'; // use correct entity

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, patient => patient.visits, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  visitType: string;

  @Column({ type: 'date' })
  visitDate: string;

  @Column({ type: 'text', nullable: true })
  reportText: string;

  @Column({ type: 'jsonb', nullable: true })
  eyeAnalysis: any;

  @CreateDateColumn()
  createdAt: Date;

  // Correct OneToMany relationship with VisitImage
  @OneToMany(() => VisitImage, img => img.visit, { cascade: true })
  images: VisitImage[];
}

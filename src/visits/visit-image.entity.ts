import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Visit } from './visit.entity';

@Entity('visit_image') // ✅ explicitly match your DB table
export class VisitImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @ManyToOne(() => Visit, visit => visit.images)
  visit: Visit;
}


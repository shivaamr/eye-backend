import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Image } from '../images/image.entity';
import { Visit } from '../visits/visit.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt: Date;

  // Images related to this patient
  @OneToMany(() => Image, image => image.patient)
  images: Image[];

  // Visits related to this patient
  @OneToMany(() => Visit, (visit) => visit.patient)
  visits: Visit[];
}

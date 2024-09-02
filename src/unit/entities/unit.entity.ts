import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unit {
    @PrimaryColumn()
    dataId: string;
    @Column()
    id: string;
    @Column()
    temperature: string;
    @Column()
    pressure: string;
    @Column()
    density: string;
    @Column()
    viscosity: string;
    @Column()
    phase: string;
}

import {PrimaryGeneratedColumn, Column,} from "typeorm";
import {TimeStamp} from "./TimeStamp";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(type => TimeStamp, {prefix: ''})
    timestamp: TimeStamp

}

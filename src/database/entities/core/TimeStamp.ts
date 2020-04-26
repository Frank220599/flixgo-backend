import {CreateDateColumn, UpdateDateColumn, VersionColumn} from "typeorm";

export class TimeStamp {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version: number;

}
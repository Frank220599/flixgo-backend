import {CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn} from "typeorm";

export class TimeStamp {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @VersionColumn()
    version: number;

}

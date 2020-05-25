import {CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn} from "typeorm";

export class TimeStamp {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({select: false})
    deletedAt: Date;

    @VersionColumn({select: false})
    version: number;

}

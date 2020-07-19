import {EntityRepository} from "typeorm"

import CrudRepository from "../utils/CrudRepository";
import Announcement from "../database/entities/Announcement";
import AnnouncementDTO from "../dto/AnnouncementDTO";

@EntityRepository(Announcement)
class AnnouncementRepository extends CrudRepository<Announcement, AnnouncementDTO> {

    public async findFromJson() {
        return await this.createQueryBuilder('announcement')
            .where('announcement.parameters ::json @> :parameter', {
                parameter: {name: "square", value: "24 000"}
            })
            .getMany()
    }

}


export default AnnouncementRepository;

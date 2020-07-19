import {Length, IsNotEmpty, IsOptional} from "class-validator";

class AnnouncementDTO {

    @Length(2, 20)
    public title: string;

    @Length(2)
    public description: string;

    @IsNotEmpty()
    public price: number;

    @IsOptional()
    public parameters: ParameterDTO[];

    public slug: string;

    public authorId: number;

}

export class ParameterDTO {
    @Length(2, 20)
    name: string;

    @Length(2, 20)
    value: string;
}

export default AnnouncementDTO;

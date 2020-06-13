import {Request, Response} from "express";
import {
    Get,
    JsonController,
    Req,
    Res,
} from "routing-controllers"
import {getRepository} from "typeorm"
import Quality from "../database/entities/Quality";


@JsonController("/qualities")
export class QualityController {

    private readonly repository = getRepository(Quality);

    @Get("/")
    public async getQualities(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const qualities = await this.repository.find();
            return await res.json({data: qualities})
        } catch (error) {
            return res.json({error})
        }
    }

}


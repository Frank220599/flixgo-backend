import {Response} from "express";
import {
    Get,
    JsonController,
    Res,
} from "routing-controllers"
import CountriesService from "../services/CountriesService";

@JsonController("/defaults")
export class DefaultController {

    private readonly regionsService = new CountriesService();

    @Get("/countries")
    public async getGenres(@Res() res: Response): Promise<any> {
        try {
            const countries = await this.regionsService.getAllCountries();
            return await res.json({data: countries[1]})
        } catch (error) {
            return res.json({error})
        }
    }

}


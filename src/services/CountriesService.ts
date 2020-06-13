import request from "request-promise-native"
import NodeCache from "node-cache";

class CountriesService {

    countriesCache = new NodeCache({checkperiod: 0});

    public async getAllCountries(): Promise<any> {

        if (this.countriesCache.has('countries')) {
            return this.countriesCache.get('countries')
        } else {
            const countries = await request.get('http://api.worldbank.org/v2/country?per_page=304&format=json', {
                json: true,
            });
            this.countriesCache.set('countries', countries);
            return countries;
        }

    }
}

export default CountriesService;

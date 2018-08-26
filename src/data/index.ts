// tslint:disable-next-line:no-var-requires
const countries: string[] = require('./countries.json');

// https://stackoverflow.com/a/37511463
const normaliseAccents = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
const sortWithAccents = (names: string[]): string[] => [...names].sort(new Intl.Collator().compare);

export interface Country {
  name: string;
  normalized: string;
}

const getCountries = (): Country[] =>
  sortWithAccents(countries).map((countryName: string) => ({
    name: countryName,
    normalized: normaliseAccents(countryName),
  }));
export const allCountries = getCountries();

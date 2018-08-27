// tslint:disable-next-line:no-var-requires
const countries: string[] = require('./countries.json');

interface Country {
  name: string;
  normalized: string;
}

// https://stackoverflow.com/a/37511463
const normalise = (name: string): string =>
  name
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
const sortWithAccents = (names: string[]): string[] => [...names].sort(new Intl.Collator().compare);

const allCountries = sortWithAccents(countries).map((countryName: string) => ({
  name: countryName,
  normalized: normalise(countryName),
}));

export const suggestCountries = (searchString: string): string[] => {
  const search = normalise(searchString);
  if (search.length === 0) {
    return [];
  }
  return allCountries
    .filter(({ normalized }: Country) => normalized.startsWith(search))
    .map(({ name }: Country) => name);
};

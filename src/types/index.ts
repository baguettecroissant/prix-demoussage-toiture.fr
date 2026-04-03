export interface City {
  name: string;
  slug: string;
  zip: string;
  department_name: string;
  department_code: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  population: number;
}

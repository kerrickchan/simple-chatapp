import { IOpeninghour } from './IOpeningHour';
import { IAddress } from './IAddress';

export interface IDoctor {
  id: string;
  address: IAddress;
  description: string;
  name: string;
  opening_hours: IOpeninghour[];
}

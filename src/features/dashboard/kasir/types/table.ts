interface ITableStatus {
  AVAILABLE: 'AVAILABLE';
  OCCUPIED: 'OCCUPIED';
  RESERVED: 'RESERVED';
  MAINTENANCE: 'MAINTENANCE';
}

interface ITableLocation {
  INDOOR: 'INDOOR';
  OUTDOOR: 'OUTDOOR';
}

export interface IBaseTable {
  id: string;
  number: number;
  capacity: number;
  status: ITableStatus[keyof ITableStatus];
  currentGuests: number;
  location: ITableLocation[keyof ITableLocation];
  lastCleaned: string;
  reservedBy?: string;
  reservedTime?: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

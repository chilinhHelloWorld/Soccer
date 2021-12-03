export interface User {
  id: string;
  playerName: string;
  dateOfBirth: string | Date;
  position: string | Position;
  nativeCountry: string | NativeCountry;
  overall: number;
}

export interface NativeCountry {
  value: string;
  label: string;
}

export interface Position {
  value: string;
  label: string;
}

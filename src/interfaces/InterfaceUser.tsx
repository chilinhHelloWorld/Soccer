export interface User {
  id: string;
  playerName: string | Date;
  dateOfBirth: Date;
  position: string | Position;
  nativeCountry: string | NativeCountry;
}

export interface NativeCountry {
  value: string;
  label: string;
}

export interface Position {
  value: string;
  label: string;
}

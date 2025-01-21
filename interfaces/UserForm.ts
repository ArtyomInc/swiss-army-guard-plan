export interface userForm {
  beginDateTime: Date | undefined;
  endDateTime: Date | undefined;
  guardDuration: number | undefined;
  guardOfficer: string;
  guardCommander: string;
  guardPair: string[];
}

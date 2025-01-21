export interface GuardPairPerDay {
  name: string;
  period: string[];
}

export interface GuardPerDay {
  date: string;
  pair: GuardPairPerDay[];
}

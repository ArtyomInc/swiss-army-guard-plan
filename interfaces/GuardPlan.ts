export interface GuardPairPerDay {
  name: string;
  period: { name: string; class?: string }[];
}

export interface GuardPerDay {
  date: string;
  pair: GuardPairPerDay[];
}

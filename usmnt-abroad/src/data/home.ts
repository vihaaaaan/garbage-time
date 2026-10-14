export type Fixture = {
  id: string;
  date: string;
  time: string;
  competition: string;
  home: string;
  away: string;
  watching: string[];
  href: string;
};

export type Performer = {
  rank: string;
  name: string;
  club: string;
  result: string;
  detail: string;
};

export const upcomingFixtures: Fixture[] = [
  {
    id: "psv-heerenveen",
    date: "fri · oct 9",
    time: "20:00",
    competition: "eredivisie",
    home: "psv",
    away: "sc heerenveen",
    watching: ["sergiño dest"],
    href: "https://www.psv.nl/en/match-center",
  },
  {
    id: "palace-forest",
    date: "sun · oct 11",
    time: "13:00",
    competition: "premier league",
    home: "crystal palace",
    away: "nottingham forest",
    watching: ["chris richards", "zavier gozo"],
    href: "https://www.cpfc.co.uk/matches/first-team/",
  },
  {
    id: "leipzig-psv",
    date: "tue · oct 13",
    time: "21:00",
    competition: "champions league",
    home: "rb leipzig",
    away: "psv",
    watching: ["sergiño dest"],
    href: "https://www.psv.nl/en/match-center",
  },
];

export const recentPerformers: Performer[] = [
  {
    rank: "01",
    name: "chris richards",
    club: "crystal palace",
    result: "captain",
    detail: "wore the armband for the usa",
  },
  {
    rank: "02",
    name: "malik tillman",
    club: "bayer leverkusen",
    result: "2g · 1a",
    detail: "611 national-team minutes in 2026",
  },
  {
    rank: "03",
    name: "sergiño dest",
    club: "psv eindhoven",
    result: "potm",
    detail: "champions league opener",
  },
];

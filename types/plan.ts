export type Audience = {
  age: string;
  platform: string;
  pain: string;
  reach: string;
};

export type PlanDay = {
  day: string;
  emotion: string;
  hook: string;
  idea: string;
  badges: string[];
  tools?: string[];
};

export type Plan = {
  audience: Audience;
  days: PlanDay[];
  tools: string[];
};

export type PlanRequest = {
  description: string;
  types: string[];
  language: string;
  mode?: "content" | "tools";
};

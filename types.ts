export enum ChartName {
  PortfolioStructure = "portfolio-pie-structure",
  HABWeek = "hab-week-report",
}

export interface PortfolioChartDot {
     nav: number
     nav_historical: number
     deposit: number
     withdrawal: number
     portfolio: number
     benchmark: number
     date: Date
}

export interface HABWeekChart {
    dots: PortfolioChartDot[]
}

export interface PortfolioStructureRow {
  short_name: string;
  full_name: string;
  total: number;
  cost_basis: number;
  share: number;
  offset: number;
}

export interface IPortfolioStructure {
  data: PortfolioStructureRow[];
  dataWithTotal: PortfolioStructureRow[];
  total: number;
  totalData: { name: string; total: number }[];
  order: string;
}

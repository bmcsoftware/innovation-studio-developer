export interface IBarChartComponentParameters {
}

export interface IBarChartConfig {
  header: {
    title: String;
  };
  height: number;
  yAxis: {
    title: string;
  };
  xAxis: {
    title: string;
    categories: string[];
  };
  series: ISerie[]
}

export interface ISerie {
  name: string;
  data: number[];
}

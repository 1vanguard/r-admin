import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Form,
  Loading,
  required,
  SelectInput,
  useDataProvider,
  useGetList,
  useGetOne,
  useTranslate,
} from "react-admin";
import { DataProviderWithCustomMethods } from "../dataProvider";
import { BotPair } from "../types";

import { ISeriesApi, createChart, ColorType } from "lightweight-charts";

import { Box } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LightweightChartProps {
  [key: string]: any;
  chartType: string;
  parentId?: number;
  parentType?: string;
}

const chartCreate = (
  chartContainerRef: any,
  chartType: string,
  colors: any
) => {
  const chart = createChart(chartContainerRef.current, {
    layout: {
      background: {
        type: "solid",
        color: colors.backgroundColor,
      },
      textColor: colors.textColor,
    },
    width: chartContainerRef.current
      ? chartContainerRef.current.clientWidth
      : 0,
    height: 300,
  });
  let chartSeries = null;

  if (chartType === "candles") {
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: colors.greenColor,
      downColor: colors.redColor,
      borderVisible: false,
      wickUpColor: colors.greenColor,
      wickDownColor: colors.redColor,
    });
    chartSeries = candlestickSeries;
  }

  return {
    chartObj: chart,
    chartSeries: chartSeries,
  };
};

const getChartData = async (
  dataProvider: DataProviderWithCustomMethods,
  pairData: BotPair,
  timeFrame: string,
  limit: number
) => {
  try {
    return await dataProvider.getCctx({
      exchangeId: pairData.exchange_id,
      queryDataType: "candles",
      botId: pairData.bot_id,
      pairAltCur: pairData.alt_cur,
      pairBaseCur: pairData.base_cur,
      timeframe: timeFrame,
      limit: limit,
    });
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

const chartDataUpdate = async (
  dataProvider: DataProviderWithCustomMethods,
  pairData: BotPair,
  data: any,
  seriesType: string,
  chart: any,
  chartSeriesData: any
) => {
  console.log("Работает chartDataUpdate");
  const timeFrame = `${data.timeFrame}m`;
  const limit = parseInt(data.limit) / parseInt(data.timeFrame);
  console.log("data: ", data);
  console.log("timeFrame: ", timeFrame);
  console.log("limit: ", limit);
  console.log("pairData: ", pairData);
  try {
    // setIsLoadingChartData(true);
    const newChartData = await getChartData(
      dataProvider,
      pairData,
      timeFrame,
      limit
    );
    const initialChartData: Array<Object> = [];

    if (seriesType === "candles") {
      console.log("chart внутри candles: ", chart);
      console.log("chartSeriesData внутри candles: ", chartSeriesData);
      const candlesData = newChartData.data.candles.forEach((candle) => {
        const timestamp = candle[0];
        const open = candle[1];
        const high = candle[2];
        const low = candle[3];
        const close = candle[4];

        initialChartData.push({
          time: timestamp / 1000,
          open: open,
          high: high,
          low: low,
          close: close,
        });
      });
      chartSeriesData.setData(initialChartData);
      chart.timeScale().fitContent();
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

const LightweightChart: React.FC<LightweightChartProps> = ({
  chartType,
  parentId,
  parentType,
  ...props
}) => {
  const translate = useTranslate(),
    {
      data: timeframesData,
      isPending: isPendingTimeFrames,
      error: errorTimeFrames,
    } = parentType === "pair"
      ? useGetList("timeframes")
      : { data: [], isPending: false, error: null };

  const {
    data: pairData,
    isLoading: isLoadingPairData,
    error: errorPairData,
  } = parentType === "pair"
    ? useGetOne<BotPair>("pairs", { id: parentId })
    : { data: undefined, isLoading: false, error: null };

  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();
  const defaultTimeframe = 5;
  const defaultLimit = 60;
  const [chart, setChart] = useState();
  const [chartSeriesData, setChartSeriesData] = useState();
  const [errorChartData, setErrorChartData] = useState();
  const [needUpdateChartData, setNeedUpdateChartData] = useState(false);
  const [isLoadingChartData, setIsLoadingChartData] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>();
  const chartRef = useRef(null);

  const theme = useTheme(),
    theme_textPrimaryColor = theme.palette.text.primary,
    colors = {
      backgroundColor: "transparent",
      greenColor: green[500],
      redColor: red[500],
      textColor: theme_textPrimaryColor,
    };

  const onSubmitChartSettings = (data: any) => {
    chartDataUpdate(
      dataProvider,
      pairData,
      data,
      chartType,
      chart,
      chartSeriesData
    );
  };

  useLayoutEffect(() => {
    console.log("isLoadingPairData: ", isLoadingPairData);
    console.log("isPendingTimeFrames: ", isPendingTimeFrames);
    console.log("chartContainerRef: ", chartContainerRef);
    if (
      // isLoadingPairData &&
      isPendingTimeFrames
    ) {
      return;
    }
    if (!chartContainerRef.current) return;
    console.log("Лооось!");

    const { chartObj: chart, chartSeries } = chartCreate(
      chartContainerRef,
      chartType,
      colors
    );

    setChart(chart);
    setChartSeriesData(chartSeries);

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    setNeedUpdateChartData(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      // chartRef.current = null;
      chart.remove();
    };
  }, [
    // isLoadingPairData,
    isPendingTimeFrames,
    // chartContainerRef,
  ]);

  useEffect(() => {
    if (!needUpdateChartData) return;
    console.log("Работает useEffect 2");
    setNeedUpdateChartData(false);

    console.log("chartSeriesData: ", chartSeriesData);
    console.log("needUpdateChartData: ", needUpdateChartData);
    console.log("isLoadingChartData useEffect 2: ", isLoadingChartData);

    console.log("chartRef: ", chartRef);
    const initialChatSettings = {
      timeFrame: defaultTimeframe,
      limit: defaultLimit,
    };

    chartDataUpdate(
      dataProvider,
      pairData,
      initialChatSettings,
      "candles",
      chart,
      chartSeriesData
    );
  }, [
    isLoadingChartData,
    needUpdateChartData,
  ]);

  if (isPendingTimeFrames || isLoadingPairData) return <Loading />;
  if (errorTimeFrames || errorPairData)
    return (
      <div className="error loadError">{translate("errors.loadDataError")}</div>
    );

  const limits = [
    { id: 1, value: 60, name: "1h" },
    { id: 2, value: 240, name: "4h" },
    { id: 3, value: 1440, name: "1d" },
    { id: 4, value: 4320, name: "3d" },
    { id: 5, value: 10080, name: "1w" },
    { id: 6, value: 20160, name: "2w" },
    { id: 7, value: 40300, name: "1M" },
  ];
  return (
    <Box className="chartWrapper">
      <Form onSubmit={onSubmitChartSettings}>
        <Stack
          alignItems={"start"}
          direction={"row"}
          justifyContent={"start"}
          spacing={2}
        >
          <SelectInput
            choices={timeframesData}
            defaultValue={defaultTimeframe}
            optionValue="minutes"
            source="timeFrame"
            validate={required()}
          />
          <SelectInput
            choices={limits}
            defaultValue={defaultLimit}
            label="Chart period"
            optionText="name"
            optionValue="value"
            source="limit"
            validate={required()}
          />
          <button type="submit">Submit</button>
        </Stack>
      </Form>
      <div className="chartContainer" ref={chartContainerRef} />
    </Box>
  );
};

export default LightweightChart;

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
  //console.log("timeframesData: ", timeframesData);

  const {
    data: pairData,
    isLoading: isLoadingPairData,
    error: errorPairData,
  } = parentType === "pair"
    ? useGetOne<BotPair>("pairs", { id: parentId })
    : { data: undefined, isLoading: false, error: null };
  //console.log("chartType: ", chartType);
  //console.log("pairData: ", pairData);

  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();
  const [chartData, setChartData] = useState();
  const [needUpdateChartData, setNeedUpdateChartData] = useState(false);
  const [isLoadingChartData, setIsLoadingChartData] = useState(false);
  const [errorChartData, setErrorChartData] = useState();

  const theme = useTheme(),
    greenColor = green[500],
    redColor = red[500],
    theme_textPrimaryColor = theme.palette.text.primary,
    colors = {
      backgroundColor: "transparent",
      textColor: theme_textPrimaryColor,
    };

  const chartContainerRef = useRef<HTMLDivElement>();
  const chartRef = useRef(null);

  const getChartData = async (pairData, timeFrame, limit) => {
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

  const chartDataUpdate = async (data: any, chartType: string) => {
    console.log("Работает chartDataUpdate");
    const timeFrame = `${data.timeFrame}m`;
    const limit = parseInt(data.limit) / parseInt(data.timeFrame);
    console.log("data: ", data);
    console.log("timeFrame: ", timeFrame);
    console.log("limit: ", limit);
    console.log("pairData: ", pairData);
    try {
      const newChartData = await getChartData(pairData, timeFrame, limit);
      console.log("newChartData: ", newChartData);

      const initialChartData: Array<Object> = [];
      if (chartType === "candles") {
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
        console.log("initialChartData: ", initialChartData);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onSubmitChartSettings = (data: any) => {
    chartDataUpdate(data, chartType);
  };

  useLayoutEffect(() => {
    if (isPendingTimeFrames) return;
    if (!chartContainerRef.current) return;
    console.log("Лооось!");
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

    chartRef.current = chart
    //chart ? (chartRef.current = chart) : null;

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    setNeedUpdateChartData(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      //chartRef.current = null;
      chart.remove();
    };
  }, [
    isPendingTimeFrames,
    //    chartContainerRef,
    // isLoadingPairData,
    // pairData
  ]);

  useEffect(() => {
    if (!needUpdateChartData) return;

    console.log("Работает useEffect 2");
    setNeedUpdateChartData(false);
    setIsLoadingChartData(true);

    console.log("needUpdateChartData: ", needUpdateChartData);
    console.log("isLoadingChartData useEffect 2: ", isLoadingChartData);

    dataProvider
      .getCctx({
        exchangeId: pairData.exchange_id,
        queryDataType: "candles",
        botId: pairData.bot_id,
        pairAltCur: pairData.alt_cur,
        pairBaseCur: pairData.base_cur,
        timeframe: "5m",
        limit: 100,
      })
      .then((data) => {
        // setIsLoadingChartData(false);
        console.log("isLoadingChartData then: ", isLoadingChartData);

        const initialChartData: Array<Object> = [];
        const candlesData = data.data.candles.forEach((candle) => {
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

        setChartData(initialChartData);

        const candlestickSeries = chartRef.current.addCandlestickSeries({
          upColor: greenColor,
          downColor: redColor,
          borderVisible: false,
          wickUpColor: greenColor,
          wickDownColor: redColor,
        });

        candlestickSeries.setData(initialChartData);
        chartRef.current.timeScale().fitContent();

        /* return (
            setIsLoadingChartData(false)
          ) */
      })
      .catch((error) => {
        setIsLoadingChartData(false);
        setErrorChartData(error);
      });
  }, [
    isLoadingChartData,
    needUpdateChartData,
    /*
      chartData,
    chartRef,
    pairData,,
    colors,
    isPendingTimeFrames, */
  ]);

  if (isPendingTimeFrames || isLoadingPairData)
    return <Loading />;
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
            defaultValue={"5"}
            optionValue="minutes"
            source="timeFrame"
            validate={required()}
          />
          <SelectInput
            choices={limits}
            defaultValue={60}
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

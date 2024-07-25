import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Loading,
  SelectInput,
  useDataProvider,
  useTranslate,
  useGetList,
  useGetOne,
} from "react-admin";
import { DataProviderWithCustomMethods } from "../dataProvider";

import { ISeriesApi, createChart, ColorType } from "lightweight-charts";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import { BotPair } from "../types";

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
      isPending: timeframesIsPending,
      error: timeframesError,
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

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef(null);
  const chartSeriesDataRef = useRef<ISeriesApi<any> | null>(null);

  useEffect(() => {
    //if (timeframesIsPending) return;
    if (!chartContainerRef.current) return;
    /* console.log("isLoadingPairData: ", isLoadingPairData);
    console.log("chartData: ", chartData);
    console.log("pairData: ", pairData); */
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

    chart ? (chartRef.current = chart) : null;

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
    chartContainerRef.current,
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
    timeframesIsPending, */
  ]);

  if (/* isLoadingChartData || */ timeframesIsPending || isLoadingPairData)
    return <Loading />;
  if (timeframesError || errorPairData)
    return (
      <div className="error loadError">{translate("errors.loadDataError")}</div>
    );
  return (
    <Box className="chartWrapper">
      {/* <SelectInput
        choices={timeframesData}
        isPending={timeframesIsPending}
        //optionValue="minutes"
        source="timeframe"
        //onChange={}
      /> */}
      <div className="lightweight-charts_wrap" ref={chartContainerRef} />
    </Box>
  );
};

export default LightweightChart;

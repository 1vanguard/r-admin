import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
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
import { BotPair, Exchange, timeFrame } from "../types";

import { createChart, TimeScaleOptions } from "lightweight-charts";

import { Box } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import { time } from "console";

interface LightweightChartProps {
  [key: string]: any;
  chartType: string;
  parentId?: number;
  parentType?: string;
}

/* const TimeframeInput = () => {
  const country = useWatch<{ country: string }>({ name: "country" });

  return (
      <SelectInput
          choices={country ? toChoices(cities[country]) : []}
          source="cities"
      />
  );
}; */

const LightweightChart: React.FC<LightweightChartProps> = ({
  chartType,
  parentId,
  parentType,
  ...props
}) => {
  const limits = [
    { id: 1, value: 60, name: "1h" },
    { id: 2, value: 240, name: "4h" },
    { id: 3, value: 1440, name: "1d" },
    { id: 4, value: 4320, name: "3d" },
    { id: 5, value: 10080, name: "1w" },
    { id: 6, value: 20160, name: "2w" },
    { id: 7, value: 40300, name: "1M" },
  ];
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

  const {
    data: exchangeData,
    isLoading: isLoadingExchangeData,
    error: errorExchangeData,
  } = parentType === "pair"
    ? useGetOne("exchanges", { id: pairData?.exchange_id })
    : { data: undefined, isLoading: false, error: null };

  const theme = useTheme(),
    theme_textPrimaryColor = theme.palette.text.primary,
    colors = {
      backgroundColor: "transparent",
      greenColor: green[500],
      redColor: red[500],
      textColor: theme_textPrimaryColor,
    };


  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();
  const chartContainerRef = useRef<HTMLDivElement>();
  const defaultTimeframe = 5;
  const defaultLimit = 60;
  const [selectedTimeframe, setSelectedTimeframe] = useState(defaultTimeframe);
  const [timeframeChoices, setTimeframeChoices] = useState(timeframesData || []);
  const [selectedLimit, setSelectedLimit] = useState(defaultLimit);
  const [limitChoices, setLimitChoices] = useState(limits || []);
  const [chart, setChart] = useState();
  const [chartSeriesData, setChartSeriesData] = useState();
  const [errorChartData, setErrorChartData] = useState();
  const [needUpdateChartData, setNeedUpdateChartData] = useState(false);
  const [isLoadingChartData, setIsLoadingChartData] = useState(false);

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

    const timeScaleOptions: TimeScaleOptions = {
      timeVisible: true,
      secondsVisible: false,
    };

    chart.applyOptions({
      timeScale: timeScaleOptions,
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
    let err: any = null;
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
      err = error;
      console.log("error: ", error);
      setErrorChartData(err);
      throw error;
    }
  };

  const chartDataUpdate = async (
    dataProvider: DataProviderWithCustomMethods,
    pairData: BotPair,
    exchangeData: Exchange,
    timeframesData: timeFrame,
    data: any,
    seriesType: string,
    chart: any,
    chartSeriesData: any
  ) => {
    console.log("Работает chartDataUpdate");

    const exchangeTitleLC = exchangeData.title.toLowerCase();
    const timeFrameForExchange = timeframesData.find(
      (obj: { minutes: number }) => obj.minutes === parseInt(data.timeFrame)
    )?.[exchangeTitleLC as keyof typeof obj];
    const limit = Math.floor(parseInt(data.limit) / parseInt(data.timeFrame));
    try {
      setIsLoadingChartData(true);
      const newChartData = await getChartData(
        dataProvider,
        pairData,
        timeFrameForExchange,
        limit
      );
      const initialChartData: Array<Object> = [];

      if (seriesType === "candles") {
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
    } finally {
      setIsLoadingChartData(false);
    }
  };

  const onSubmitChartSettings = (data: any) => {
    console.log("data: ", data);
    chartDataUpdate(
      dataProvider,
      pairData,
      exchangeData,
      timeframesData,
      data,
      chartType,
      chart,
      chartSeriesData
    );
    setSelectedTimeframe(data.timeFrame);
    setSelectedLimit(data.limit);
  };

  const handleTimeframeChange = (event) => {
    const newValue = event.target.value;
    setSelectedTimeframe(newValue);
    approveChartSettings(newValue, selectedLimit);
    //console.log("selectedLimit: ", selectedLimit);
  };

  const handleLimitChange = (event) => {
    const newValue = event.target.value;
    setSelectedLimit(newValue);
    approveChartSettings(selectedTimeframe, newValue);
    //console.log("selectedTimeframe: ", selectedTimeframe);
  };

  useEffect(() => {
    console.log("selectedTimeframe: ", selectedTimeframe);
    console.log("selectedLimit: ", selectedLimit);
  }, [selectedTimeframe, selectedLimit]);

  const approveChartSettings = (timeframe, limit) => {
    console.log("Работает approveChartSettings");
    console.log("timeframe: ", timeframe);
    console.log("limit: ", limit);
    console.log("timeframeChoices: ", timeframeChoices);
    console.log("limitChoices: ", limitChoices);
    if (timeframe > limit) {
      console.log("timeframe > limit");
      const newLimitChoices = limitChoices.map((obj) => {
        if (timeframe >= obj.value) {
          return { ...obj, disabled: true };
        } else {
          return obj;
        }
      })

      console.log("newLimitChoices: ", newLimitChoices);

      setLimitChoices(newLimitChoices);
      // setSelectedTimeframe(newLimitChoices[0].value);
      setSelectedLimit(newLimitChoices[6].value);
    }
  };

  useLayoutEffect(() => {
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
    setTimeframeChoices(timeframesData);
    setLimitChoices(limits);

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    setNeedUpdateChartData(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    // isLoadingPairData,
    isPendingTimeFrames,
    // chartContainerRef,
  ]);

  useEffect(() => {
    const setChartData = async () => {
      if (!needUpdateChartData) return;
      setNeedUpdateChartData(false);

      const initialChartSettings = {
        timeFrame: defaultTimeframe,
        limit: defaultLimit,
      };

      await chartDataUpdate(
        dataProvider,
        pairData,
        exchangeData,
        timeframesData,
        initialChartSettings,
        "candles",
        chart,
        chartSeriesData
      );
    };

    setChartData();
  }, [/* isLoadingChartData, */ needUpdateChartData]);

  if (isPendingTimeFrames || isLoadingPairData || isLoadingExchangeData)
    return <Loading />;
  if (errorTimeFrames || errorPairData || errorExchangeData || errorChartData)
    return (
      <div className="error loadError">{translate("errors.loadDataError")}</div>
    );

  return (
    <Box className="chartWrapper">
      <Form onSubmit={onSubmitChartSettings}>
        <Stack
          alignItems={"start"}
          direction={{ xs: "column", md: "row" }}
          justifyContent={"start"}
          spacing={2}
        >
          <SelectInput
            choices={timeframeChoices}
            defaultValue={selectedTimeframe}
            disabled={isLoadingChartData}
            onChange={(e) => {
              //setSelectedTimeframe(e.target.value);
              handleTimeframeChange(e);
            }}
            optionValue="minutes"
            source="timeFrame"
            validate={required()}
          />
          <SelectInput
            //choices={limits}
            choices={limitChoices}
            defaultValue={selectedLimit}
            disabled={isLoadingChartData}
            label="Chart period"
            onChange={(e) => {
              // setSelectedLimit(e.target.value);
              handleLimitChange(e);
            }}
            optionText="name"
            optionValue="value"
            source="limit"
            validate={required()}
            //value={selectedLimit}
          />
          <Button
            disabled={isLoadingChartData}
            size="large"
            sx={{ width: "100%" }}
            type="submit"
            variant="contained"
          >
            {isLoadingChartData ? (
              <CachedIcon className="animate__spin360" />
            ) : (
              "Update"
            )}
          </Button>
        </Stack>
      </Form>
      <div className="chartContainer" ref={chartContainerRef} />
    </Box>
  );
};

export default LightweightChart;

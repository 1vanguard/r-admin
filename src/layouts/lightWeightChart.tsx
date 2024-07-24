import * as React from "react";
import { useEffect, useRef } from "react";
import { Loading, SelectInput, useTranslate, useGetList } from "react-admin";

import { createChart, ColorType } from "lightweight-charts";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

const LightweightChart = (props: any) => {
  const translate = useTranslate(),
    {
      data: timeframesData,
      isPending: timeframesIsPending,
      error: timeframesError,
    } = useGetList("timeframes");
  //console.log("timeframesData: ", timeframesData);

  const theme = useTheme(),
    greenColor = green[500],
    redColor = red[500],
    theme_textPrimaryColor = theme.palette.text.primary,
    {
      data,
      colors: {
        backgroundColor = "transparent",
        textColor = theme_textPrimaryColor,
      } = {},
    } = props;

  useEffect(() => {
    if (timeframesIsPending) return;
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: "solid",
          color: backgroundColor,
        },
        textColor: theme_textPrimaryColor,
      },
      //width: chartContainerRef.current.clientWidth,
      width: chartContainerRef.current
        ? chartContainerRef.current.clientWidth
        : 0,
      height: 300,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: greenColor,
      downColor: redColor,
      borderVisible: false,
      wickUpColor: greenColor,
      wickDownColor: redColor,
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, textColor, timeframesIsPending]);

  //const chartContainerRef = useRef();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  if (timeframesIsPending) return <Loading />;
  if (timeframesError)
    return (
      <div className="error loadError">{translate("errors.loadDataError")}</div>
    );

  return (
    <Box className="chartWraper">
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

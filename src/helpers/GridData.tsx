import { useGetOne, useTranslate } from "react-admin";
import { BotGrid, FBotGrid, FPairGrid, PairGrid } from "../types";
import LinearProgress from "@mui/material/LinearProgress";

interface GridDataProps {
  type: string;
  id: number;
  parameter: string;
  additionalFilters?: {
    [key: string]: any;
  };
}

const GridData: React.FC<GridDataProps> = ({ type, id, parameter }) => {
  const translate = useTranslate(),
    {
      data: GridDataLoaded,
      isLoading,
      error,
    } = useGetOne<BotGrid | PairGrid | FBotGrid | FPairGrid>(
      `botgrid-by-${type}`,
      {
        id: id,
      }
    );
  if (isLoading) {
    return <LinearProgress />;
  }
  if (error)
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );

  let displayData: any = "";

  if (type === "bot" || type === "fbot") {
    const botGridData = GridDataLoaded as BotGrid | FBotGrid,
      inTrades = botGridData?.in_trades
        ? Math.round(botGridData.in_trades)
        : "-",
      profit = botGridData?.profit ? Math.round(botGridData.profit) : "-";

    if (parameter === "in_trades") {
      displayData = inTrades;
    } else if (parameter === "profit") {
      displayData = profit;
    }
  }

  if (type === "pair" || type === "fpair") {
    const pairGridData = GridDataLoaded as PairGrid | FPairGrid,
      inOrders = pairGridData?.in_orders
        ? Math.round(pairGridData.in_orders)
        : "-",
      purchases = pairGridData?.purchases
        ? Math.round(pairGridData.purchases)
        : "-",
      sales = pairGridData?.sales ? Math.round(pairGridData.sales) : "-";

    if (parameter === "in_orders") {
      displayData = inOrders;
    } else if (parameter === "purchases") {
      displayData = purchases;
    } else if (parameter === "sales") {
      displayData = sales;
    }
  }

  return <span>{displayData}</span>;
};

export default GridData;

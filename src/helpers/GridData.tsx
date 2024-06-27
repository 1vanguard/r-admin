import { useGetOne } from "react-admin";
import { BotGrid, PairGrid } from "../types";
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
  const {
    data: GridDataLoaded,
    isLoading,
    error,
  } = useGetOne<BotGrid | PairGrid>(`botgrid-by-${type}`, {
    id: id,
  });
  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) return <div>ERROR</div>;

  let displayData: any = "";
  if (type === "bot") {
    const botGridData = GridDataLoaded as BotGrid;
    const in_tradesData = botGridData?.in_trades,
      inTrades = in_tradesData ? Math.round(in_tradesData) : "-",
      profitData = botGridData?.profit,
      profit = profitData ? Math.round(profitData) : "-";

    if (parameter === "in_trades") {
      displayData = inTrades;
    }
    if (parameter === "profit") {
      displayData = profit;
    }
  }

  if (type === "pair") {
    const pairGridData = GridDataLoaded as PairGrid;
    const in_ordersData = pairGridData?.in_orders,
      inOrders = in_ordersData ? Math.round(in_ordersData) : "-",
      purchasesData = pairGridData?.purchases,
      purchases = purchasesData ? Math.round(purchasesData) : "-",
      salesData = pairGridData?.sales,
      sales = salesData ? Math.round(salesData) : "-";

    if (parameter === "in_orders") {
      displayData = inOrders;
    }
    if (parameter === "purchases") {
      displayData = purchases;
    }
    if (parameter === "sales") {
      displayData = sales;
    }
  }

  return <span>{displayData}</span>;
};

export default GridData;

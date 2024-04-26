import { Loading, useGetOne } from "react-admin";
import { BotGrid, BotPair } from "../types";

interface GridDataProps {
  type: string;
  id: number;
  parameter: string;
}

const GridData: React.FC<GridDataProps> = ({ type, id, parameter }) => {
  const {
    data: GridDataLoaded,
    isLoading,
    error,
  } = useGetOne<BotGrid>(`botgrid-by-${type}`, {
    id: id,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  let displayData: any = "";
  // console.log(GridDataLoaded);

  const in_tradesData = GridDataLoaded?.in_trades,
    inTrades = in_tradesData ? Math.round(in_tradesData) : "-",
    profitData = GridDataLoaded?.profit,
    profit = profitData ? Math.round(profitData) : "-";

  if (parameter === "in_trades") {
    displayData = inTrades;
  }
  if (parameter === "profit") {
    displayData = profit;
  }
  return <span>{displayData}</span>;
};

export default GridData;

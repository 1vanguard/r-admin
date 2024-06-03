import * as React from "react";
import { useState } from "react";
import { Loading, useGetManyReference, useRecordContext } from "react-admin";
import { BotPair, PairOrder, TabPanelProps } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

type PairOrdersProps = {
  autoUpdate?: boolean;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, tabValue, index, parentId, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`pair_${parentId}_orders-tabpanel_${index}`}
      aria-labelledby={`pair_${parentId}_orders-tabpanel_${index}`}
      {...other}
    >
      {tabValue === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number, pairId: number) {
  return {
    id: `pair_${pairId}-orders_tab-${index}`,
    "aria-controls": `orders-tabpanel-${index}`,
  };
}

const PairOrders: React.FC<PairOrdersProps> = (autoUpdate) => {
  const pair = useRecordContext<BotPair>();
  const [tabValue, setValue] = useState(0);
  const {
    data: ordersSellDone,
    isLoading: isLoadingOrdersSellDone,
    error: errorOrdersSellDone,
    refetch: refetchOrdersSellDone,
  } = useGetManyReference<PairOrder>(
    "orders",
    {
      target: "pair_id",
      id: pair.id,
      pagination: { page: 1, perPage: 1000000 },
      sort: { field: "startOrder", order: "DESC" },
      filter: {
        sell_done: 0,
      },
    },
    {
      refetchInterval: autoUpdate ? 10000 : false,
      refetchIntervalInBackground: autoUpdate ? true : false,
      refetchOnReconnect: autoUpdate ? true : false,
    }
  );
  const {
    data: ordersLatest,
    isLoading: isLoadingOrdersLatest,
    error: errorOrdersLatest,
    refetch: refetchOrdersLatest,
  } = useGetManyReference<PairOrder>(
    "orders",
    {
      target: "pair_id",
      id: pair.id,
      pagination: { page: 1, perPage: 50 },
      sort: { field: "startOrder", order: "DESC" },
      filter: {
        sell_done: 1,
      },
    },
    {
      refetchInterval: autoUpdate ? 10000 : false,
      refetchIntervalInBackground: autoUpdate ? true : false,
      refetchOnReconnect: autoUpdate ? true : false,
    }
  );

  /* if (isLoadingOrdersSellDone || isLoadingOrdersLatest) {
    console.log("isLoadingOrdersSellDone: ", isLoadingOrdersSellDone);
    return <Loading />;
  }
  if (errorOrdersSellDone || errorOrdersLatest) {
    return <p>ERROR</p>;
  } */

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // console.log("ordersLatest: ", ordersLatest);
  // console.log("isLoadingOrdersSellDone: ", isLoadingOrdersSellDone);
  // console.log("isLoadingOrdersLatest: ", isLoadingOrdersLatest);
  return (
    <Box className="pairOrders" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabsChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Opened orders" {...a11yProps(0, pair.id)} wrapped />
          <Tab label="Last orders" {...a11yProps(1, pair.id)} wrapped />
        </Tabs>
      </Box>
      <CustomTabPanel tabValue={tabValue} index={0} parentId={pair.id}>
        {/* <button onClick={() => refetchOrdersSellDone()} type="button">
          Refresh sell done orders
        </button> */}
        <div className="tableWrap">
          <Table aria-labelledby="Sell done orders" size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Start order</TableCell>
                <TableCell>Sell price</TableCell>
                <TableCell>Sell Qty</TableCell>
                <TableCell>Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingOrdersSellDone ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : errorOrdersSellDone ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    Data error
                  </TableCell>
                </TableRow>
              ) : ordersSellDone && ordersSellDone.length > 0 ? (
                ordersSellDone.map((order) => {
                  const orderDone_color =
                    order.order_done == 1 ? "red" : "inherit";
                  return (
                    <TableRow key={order.id}>
                      <TableCell style={{ color: orderDone_color }}>
                        {order.price}
                      </TableCell>
                      <TableCell style={{ color: orderDone_color }}>
                        {order.qty}
                      </TableCell>
                      <TableCell
                        style={{
                          color: orderDone_color,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(order.startOrder).toLocaleString("ru-RU", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>{order.sell_price}</TableCell>
                      <TableCell>{order.sell_qty}</TableCell>
                      <TableCell>{order.profit}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    No orders
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CustomTabPanel>
      <CustomTabPanel tabValue={tabValue} index={1} parentId={pair.id}>
        {/* <button onClick={() => refetchOrdersLatest()} type="button">
          Refresh last orders
        </button> */}
        <div className="tableWrap">
          <Table aria-labelledby="Last orders" size="small" stickyHeader>
            {/* <caption
                className="captionTop"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  textAlign: "center",
                }}
              >
                Newest orders
              </caption> */}
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Start order</TableCell>
                <TableCell>Sell price</TableCell>
                <TableCell>Sell Qty</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell>Sell order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingOrdersLatest ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : errorOrdersLatest ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    Data error
                  </TableCell>
                </TableRow>
              ) : ordersLatest && ordersLatest.length > 0 ? (
                ordersLatest.map((order) => {
                  const sellDone_color =
                    order.sell_done == 1 ? "green" : "inherit";
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.qty}</TableCell>
                      <TableCell
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(order.startOrder).toLocaleString("ru-RU", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                      <TableCell style={{ color: sellDone_color }}>
                        {order.sell_price}
                      </TableCell>
                      <TableCell style={{ color: sellDone_color }}>
                        {order.sell_qty}
                      </TableCell>
                      <TableCell style={{ color: sellDone_color }}>
                        {order.profit}
                      </TableCell>
                      <TableCell
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(order.sellOrder).toLocaleString("ru-RU", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    No orders
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CustomTabPanel>
    </Box>
  );
};

export default PairOrders;

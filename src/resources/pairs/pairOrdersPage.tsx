import * as React from "react";
import { Link, useParams } from "react-router-dom";
import LightweightChart from "../../layouts/lightWeightChart";
import {
  Loading,
  useCreatePath,
  useGetManyReference,
  useGetOne,
  useSidebarState,
  useTranslate,
} from "react-admin";
import { BotPair, PairOrder } from "../../types";

import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const NoOrders = (props: any) => {
  const pairState = props.state,
    translate = useTranslate();
  let noText = translate("common.no_orders");

  if (pairState === 0) {
    noText = translate("common.pair_has_no_inactive_orders");
  }
  return (
    <Box>
      <Typography>{noText}</Typography>
    </Box>
  );
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface PairOrdersAccordionProps {
  ordersByKey: { [key: string]: PairOrder[] };
}

const PairOrdersAccordion: React.FC<PairOrdersAccordionProps> = ({
  ordersByKey,
}) => {
  const translate = useTranslate(),
    { id: pairId } = useParams(),
    {
      data: pairData,
      isLoading: isLoadingPairData,
      error: errorPairData,
    } = useGetOne<BotPair>("pairs", { id: pairId });

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  if (isLoadingPairData) return <Loading />;
  if (errorPairData)
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );

  if (Object.keys(ordersByKey).length === 0)
    return <NoOrders state={pairData?.state} />;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const ordersAccordion = Object.entries(ordersByKey).map(
    ([orderKey, orders]) => {
      return (
        <Accordion
          expanded={expanded === "orders_" + orderKey}
          key={orderKey}
          onChange={handleChange("orders_" + orderKey)}
        >
          <AccordionSummary
            aria-controls={"orders_" + orderKey + "-content"}
            id={"order_" + orderKey + "-header"}
          >
            <Typography>{orderKey}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table
              aria-labelledby={translate("common.orders")}
              className="pairOrders"
              size="small"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>{translate("common.time")}</TableCell>
                  <TableCell>{translate("common.price")}</TableCell>
                  <TableCell>{translate("common.qty")}</TableCell>
                  <TableCell>
                    {translate("common.qty")} {translate("common.usdt")}
                  </TableCell>
                  <TableCell>{translate("common.profit")}</TableCell>
                  <TableCell>{translate("common.state")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order: PairOrder) => {
                  const qtyUsdt =
                    order.sell_done == 1
                      ? (
                          order.sell_price * order.sell_qty -
                          order.price * order.qty
                        ).toFixed(2)
                      : null;
                  const profit =
                    order.sell_done == 1
                      ? (
                          ((order.sell_price * order.sell_qty) /
                            (order.price * order.qty) -
                            1) *
                          100
                        ).toFixed(2)
                      : (
                          ((order.sell_price * order.sell_qty) /
                            (order.price * order.qty)) *
                          100
                        ).toFixed(2);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        {order.sellOrder && (
                          <span className="date_time sell_order">
                            {new Date(order.sellOrder).toLocaleString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </span>
                        )}
                        <br />
                        <span className="date_time start_order">
                          {new Date(order.startOrder).toLocaleString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>
                        {order.sell_done == 1 ? (
                          <span className="price sell_done-1">
                            {order.sell_price}
                          </span>
                        ) : null}
                        <br />
                        <span className="price sell_done-0">{order.price}</span>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>
                        <span className="qty">{order.qty}</span>
                        <br />
                        <span className="sell_qty">{order.sell_qty}</span>
                      </TableCell>
                      <TableCell>
                        <span className="qty_usdt">{qtyUsdt}</span>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>
                        <span className="profit">{profit}%</span>
                      </TableCell>
                      <TableCell>
                        {order.sell_done == 1 ? (
                          <span className="state sell_done-1">
                            {translate("common.sold")}
                          </span>
                        ) : order.order_done == 1 ? (
                          <span className="state order_done-1">
                            {translate("common.bought")}{" "}
                            {translate("common.sell_by_market")}
                          </span>
                        ) : (
                          <span className="state order_done-0">
                            {translate("common.order_issued")}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      );
    }
  );

  return ordersAccordion;
};

const PairOrdersPage = () => {
  // const [open, setOpen] = useSidebarState();
  const { id: pairId } = useParams();
  if (!pairId) return <Loading />;

  const parsedPairId = parseInt(pairId),
    translate = useTranslate(),
    createPath = useCreatePath(),
    {
      data: pairData,
      isLoading: isLoadingPairData,
      error: errorPairData,
    } = useGetOne<BotPair>("pairs", { id: parsedPairId });

  const {
    data: exchangeData,
    isLoading: isLoadingExchangeData,
    error: errorExchangeData,
  } = useGetOne("exchanges", { id: pairData?.exchange_id });

  const {
    data: ordersData,
    isPending: isPendingOrders,
    error: errorOrdersData,
  } = useGetManyReference<PairOrder>("orders", {
    target: "pair_id",
    id: pairId,
    pagination: { page: 1, perPage: 10 },
    sort: { field: "startOrder", order: "DESC" },
  });

  if (isLoadingPairData || isLoadingExchangeData || isPendingOrders)
    return <Loading />;
  if (errorPairData || errorExchangeData || errorOrdersData)
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );

  const ordersByYearMonthDay = ordersData.reduce(
    (acc: { [key: string]: PairOrder[] }, order) => {
      const startDate = new Date(order.startOrder);
      const year = startDate.getFullYear();
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      const day = startDate.getDate().toString().padStart(2, "0");
      const yearMonthDay = `${year}-${month}-${day}`;
      if (!acc[yearMonthDay]) {
        acc[yearMonthDay] = [];
      }
      acc[yearMonthDay].push(order);
      return acc;
    },
    {}
  );
  return (
    <Box className="pairOrders">
      <Container sx={{ ml: 0 }}>
        <h2>
          {translate("common.orders")}{" "}
          <small>
            ({translate("common.pair")} {translate("common.id")}:{pairId}{" "}
            <Link
              to={createPath({ resource: "pairs", type: "edit", id: pairId })}
            >
              {pairData?.symbol}
            </Link>
            {" "}
            {translate("common.exchange")}{": "}
            <Link
              to={createPath({
                resource: "exchanges",
                type: "edit",
                id: exchangeData?.id,
              })}
            >
              {exchangeData?.title}
            </Link>
            )
          </small>
        </h2>
        <LightweightChart
          chartType="candles"
          parentId={parsedPairId}
          parentType="pair"
        ></LightweightChart>
        <PairOrdersAccordion ordersByKey={ordersByYearMonthDay} />
      </Container>
    </Box>
  );
};

export default PairOrdersPage;

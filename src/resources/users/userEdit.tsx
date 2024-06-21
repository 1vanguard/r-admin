import {
  AutocompleteInput,
  Datagrid,
  Edit,
  EditButton,
  FunctionField,
  Loading,
  Pagination,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  required,
  SelectInput,
  TabbedForm,
  TextField,
  TextInput,
  useGetList,
  useGetOne,
  usePermissions,
  useRecordContext,
  WithListContext,
} from "react-admin";
import { Bot, Exchange } from "../../types";
import { BotPanel } from "../bots/botPanel";
import BotPairsCounter from "../../layouts/botPairsCounter";
import BtnPairsList from "../../layouts/btnPairList";
import BtnsStateControl from "../../layouts/btnsStateControl";
import GridData from "../../helpers/GridData";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import CircleIcon from "@mui/icons-material/Circle";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import SettingsIcon from "@mui/icons-material/Settings";
import LinearProgress from "@mui/material/LinearProgress";

const officeFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const Editform = () => {
  const record = useRecordContext(),
    userId = localStorage.getItem("uid");

  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  const {
    data: roles,
    isLoading: isLoadingRoles,
    error: errorRoles,
  } = useGetList("roles");

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useGetOne("users", { id: userId });

  const { permissions, isLoading: isLoadingPermissions } = usePermissions();

  if (
    !record ||
    isLoadingStates ||
    isLoadingRoles ||
    isLoadingPermissions ||
    isLoadingUser
  ) {
    return <Loading />;
  }
  if (errorStates || errorRoles || errorUser) {
    return <p>ERROR</p>;
  }

  const role = permissions.role,
    userOfficeId = user?.officeId;

  return (
    <TabbedForm
      toolbar={<PrymaryEditToolbar />}
      id="editUserForm"
      syncWithLocation={false}
    >
      <TabbedForm.Tab label="Main settings">
        <Container maxWidth="md" sx={{ ml: 0 }}>
          <h2>User main settings</h2>
        </Container>
        <Container maxWidth="md" sx={{ ml: 0 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              lg={1}
              sx={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "0.8em",
                  lineHeight: "0.8em",
                  verticalAlign: "top",
                }}
              >
                ID
              </div>
              <div
                style={{
                  fontSize: "1.2em",
                  fontWeight: 700,
                  lineHeight: "2.1em",
                }}
              >
                {record.id}
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={10} lg={11}>
              <TextInput
                defaultValue={record.username}
                disabled
                fullWidth
                margin="none"
                source="username"
                validate={required()}
                variant="standard"
              />
            </Grid>
            {role === 1 && (
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  margin="none"
                  source="password"
                  type="password"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={4}>
              <SelectInput
                choices={states}
                defaultValue={record.state}
                fullWidth
                source="state"
                validate={required()}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ReferenceInput label="Role" source="role" reference="roles">
                <SelectInput
                  choices={roles}
                  defaultValue={"2"}
                  fullWidth
                  source="role"
                  validate={required()}
                  variant="standard"
                />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ReferenceInput
                label="Office"
                source="officeId"
                reference="offices"
                {...(role === 2 && { filter: { id: userOfficeId } })}
              >
                <>
                  {role === 1 && (
                    <AutocompleteInput
                      filterToQuery={officeFilterToQuery}
                      fullWidth
                      optionText="title"
                      validate={required()}
                      variant="standard"
                    />
                  )}
                  {role === 2 && (
                    <SelectInput
                      {...(role === 2 && { defaultValue: userOfficeId })}
                      fullWidth
                      optionText="title"
                      optionValue="id"
                      validate={required()}
                      variant="standard"
                    />
                  )}
                </>
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                defaultValue={record.email}
                fullWidth
                source="email"
                type="email"
                validate={required()}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                defaultValue={record.telegram}
                fullWidth
                source="telegram"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                defaultValue={record.firstName}
                fullWidth
                source="firstName"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                defaultValue={record.lastName}
                fullWidth
                source="lastName"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Container>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Bots">
        <ReferenceManyField
          reference="bots"
          filter={{ user_id: record.id }}
          target="user_id"
          perPage={10}
          pagination={<Pagination />}
        >
          <Datagrid bulkActionButtons={false} expand={<BotPanel />}>
            <TextField source="id" />
            <FunctionField
              source="state"
              label="State"
              sortable={true}
              sortBy="state"
              render={(record: Bot) => {
                let stateColor;

                switch (record.state) {
                  case -1:
                    stateColor = "disabled";
                    break;
                  case 0:
                    stateColor = "error";
                    break;
                  case 1:
                    stateColor = "success";
                    break;
                  case 2:
                    stateColor = "warning";
                    break;
                  default:
                    stateColor = "disabled";
                }

                return (
                  <div style={{ textAlign: "center" }}>
                    <CircleIcon color={stateColor} sx={{ fontSize: "0.9em" }} />
                  </div>
                );
              }}
            />
            <FunctionField
              source="title"
              label="Bot"
              render={(record: Bot) => {
                let botApiState = (
                    <KeyIcon
                      style={{ color: "green", marginRight: "5px" }}
                      sx={{ fontSize: "1.1em" }}
                    />
                  ),
                  botPauseUntil;

                if (record.api_ready === 0) {
                  botApiState = (
                    <KeyOffIcon
                      style={{ color: "red", marginRight: "5px" }}
                      sx={{ fontSize: "1.1em" }}
                    />
                  );
                }

                if (
                  record.pause_until &&
                  new Date(record.pause_until).getTime() >
                    new Date().getTime() &&
                  record.state === 2
                ) {
                  botPauseUntil = (
                    <span style={{ fontSize: "0.8em" }}>
                      <span style={{ fontWeight: "700", marginRight: "5px" }}>
                        Pause until:
                      </span>
                      {new Date(record.pause_until).toLocaleString()}
                    </span>
                  );
                }

                return (
                  <div>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {botApiState}
                      <span style={{ marginRight: "0.7em" }}>
                        {record.title}
                      </span>
                      <span
                        style={{
                          alignItems: "center",
                          display: "flex",
                          marginLeft: "auto",
                        }}
                      >
                        <BtnsStateControl style={{ marginRight: "0.7rem" }} />
                        <BtnPairsList botId={record.id} />
                        <EditButton
                          label=""
                          color="inherit"
                          variant="contained"
                          className="btn_iconOnly"
                          style={{ marginLeft: "0.3em", minWidth: "0" }}
                          icon={<SettingsIcon style={{ fontSize: "1em" }} />}
                        />
                      </span>
                    </span>
                    {botPauseUntil}
                  </div>
                );
              }}
            />
            <ReferenceField
              label="Exchange"
              source="exchange_id"
              reference="exchanges"
            >
              <FunctionField render={(record: Exchange) => record.title} />
            </ReferenceField>
            <ReferenceManyField
              reference="pairs"
              target="bot_id"
              label="Pairs count"
              perPage={1000000}
            >
              <WithListContext
                render={({ isLoading: isLoadingPairs, data: dataPairs }) => {
                  const record = useRecordContext();
                  if (isLoadingPairs) return <LinearProgress />;
                  return (
                    !isLoadingPairs && (
                      <BotPairsCounter bot={record} pairs={dataPairs} />
                    )
                  );
                }}
              />
            </ReferenceManyField>
            <TextField label="Order" source="auto_start_sum" />
            <TextField label="Profit %" source="auto_profit" />
            <TextField label="Limit" source="botlimit" />
            <FunctionField
              label="In trades"
              render={(record: Bot) => {
                return <GridData type="bot" id={record.id} parameter="in_trades" />;
              }}
            />
            <FunctionField
              label="Profit"
              render={(record: Bot) => {
                return <GridData type="bot" id={record.id} parameter="profit" />;
              }}
            />
          </Datagrid>
        </ReferenceManyField>
      </TabbedForm.Tab>
    </TabbedForm>
  );
};

const UserTitle = () => {
  const record = useRecordContext();
  return <>User {record ? `"${record.name}" (id: ${record.id})` : ""}</>;
};

export const UserEdit = () => {
  return (
    <Edit redirect={false} title={<UserTitle />}>
      <Editform />
    </Edit>
  );
};

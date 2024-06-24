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
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import BotPairsCounter from "../../layouts/botPairsCounter";
import GridData from "../../helpers/GridData";
import IdMark from "../../layouts/idMark";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
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
  )
    return <Loading />;

  if (errorStates || errorRoles || errorUser) return <div>Error loading data</div>;

  const userOfficeId = user?.officeId;

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
              <IdMark id={record.id} />
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
            {permissions.role === 1 && (
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
                reference="offices"
                source="officeId"
                {...(permissions.role === 2 && {
                  filter: { id: userOfficeId },
                })}
              >
                <>
                  {permissions.role === 1 && (
                    <AutocompleteInput
                      filterToQuery={officeFilterToQuery}
                      fullWidth
                      optionText="title"
                      validate={required()}
                      variant="standard"
                    />
                  )}
                  {permissions.role === 2 && (
                    <SelectInput
                      {...(permissions.role === 2 && {
                        defaultValue: userOfficeId,
                      })}
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
              label="State"
              render={(record: Bot) => <StateIcon record={record} />}
              sortable={true}
              sortBy="state"
              source="state"
            />
            <FunctionField
              label="Bot"
              render={(record: Bot) => <ItemStateControlBar record={record} />}
              source="title"
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
                return (
                  <GridData type="bot" id={record.id} parameter="in_trades" />
                );
              }}
            />
            <FunctionField
              label="Profit"
              render={(record: Bot) => {
                return (
                  <GridData type="bot" id={record.id} parameter="profit" />
                );
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

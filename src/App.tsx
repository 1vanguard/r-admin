import * as React from "react";
import { Route } from "react-router-dom";
import { Admin, Resource } from "react-admin";

// Providers
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
// import { Permissions } from "./types";

// Styles
import "./styles/app.css";

// Pages
import CabLogin from "./resources/cabinet/CabLoginPage";
// import CabRegistration from "./resources/cabinet/CabRegistrationPage";
import { Dashboard } from "./resources/cabinet/Dashboard";

// Resources
import { BotCreate } from "./resources/bots/botCreate";
import { BotEdit } from "./resources/bots/botEdit";
import { BotsList } from "./resources/bots/botsList";
import { ExchangeCreate } from "./resources/exchanges/exchangeCreate";
import { ExchangeEdit } from "./resources/exchanges/exchangeEdit";
import { ExchangesList } from "./resources/exchanges/exchangesList";
import { FBotCreate } from "./resources/fbots/fbotCreate";
import { FBotEdit } from "./resources/fbots/fbotEdit";
import { FBotsList } from "./resources/fbots/fbotsList";
import { FPairCreate } from "./resources/fpairs/fpairCreate";
import { FPairEdit } from "./resources/fpairs/fpairEdit";
import { FPairsList } from "./resources/fpairs/fpairsList";
import { OfficeCreate } from "./resources/offices/officeCreate";
import { OfficeEdit } from "./resources/offices/officeEdit";
import { OfficesList } from "./resources/offices/officesList";
import { PairCreate } from "./resources/pairs/pairCreate";
import { PairEdit } from "./resources/pairs/pairEdit";
import { PairsList } from "./resources/pairs/pairsList";
import { UserCreate } from "./resources/users/userCreate";
import { UserEdit } from "./resources/users/userEdit";
import { UsersList } from "./resources/users/usersList";
import { WhitelistCreate } from "./resources/whitelist/whitelistCreate";
import { WhitelistEdit } from "./resources/whitelist/whitelistEdit";
import { WhitelistList } from "./resources/whitelist/whitelistList";
import FPairOrdersPage from "./resources/fpairs/fpairOrdersPage";
import FPairsListByBot from "./resources/fpairs/fpairsListByBot";
import PairOrdersPage from "./resources/pairs/pairOrdersPage";
import PairsListByBot from "./resources/pairs/pairsListByBot";

export const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={CabLogin}
      dashboard={Dashboard}
    >
      {(permissions: any) => {
        return (
          <>
            {permissions.role === 1 || permissions.role === 2 ? (
              <Resource
                name="users"
                list={UsersList}
                create={UserCreate}
                edit={UserEdit}
                recordRepresentation="username"
              />
            ) : null}
            {permissions.role === 1 ? (
              <Resource
                name="offices"
                list={OfficesList}
                create={OfficeCreate}
                edit={OfficeEdit}
              />
            ) : null}
            {permissions.role === 1 ? (
              <Resource
                name="exchanges"
                list={ExchangesList}
                create={ExchangeCreate}
                edit={ExchangeEdit}
              />
            ) : null}
            {permissions.role === 1 ? (
              <Resource
                name="whitelist"
                list={WhitelistList}
                create={WhitelistCreate}
                edit={WhitelistEdit}
              />
            ) : null}
          </>
        );
      }}
      <Resource name="bots" list={BotsList} edit={BotEdit} create={BotCreate}>
        <Route path=":id/pairs" element={<PairsListByBot />} />
      </Resource>
      <Resource
        name="pairs"
        list={PairsList}
        edit={PairEdit}
        create={PairCreate}
      >
        <Route path=":id/orders" element={<PairOrdersPage />} />
      </Resource>
      <Resource name="fbots" list={FBotsList} edit={FBotEdit} create={FBotCreate}>
        <Route path=":id/fpairs" element={<FPairsListByBot />} />
      </Resource>
      <Resource
        name="fpairs"
        list={FPairsList}
        edit={FPairEdit}
        create={FPairCreate}
      >
        <Route path=":id/forders" element={<FPairOrdersPage />} />
      </Resource>
    </Admin>
  );
};

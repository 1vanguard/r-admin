import * as React from "react";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import {
  Admin,
  CustomRoutes,
  Resource,
  ShowGuesser
} from "react-admin";
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { Permissions } from "./types";

import CabLogin from "./resources/cabinet/CabLoginPage";
import CabRegistration from "./resources/cabinet/CabRegistrationPage";
import { Dashboard } from "./resources/cabinet/Dashboard";

import { UsersList } from "./resources/users/usersList";
import { UserEdit } from "./resources/users/userEdit";
import { UserCreate } from "./resources/users/userCreate";
import { OfficesList } from "./resources/offices/officesList";
import { OfficeCreate } from "./resources/offices/officeCreate";
import { ExchangesList } from "./resources/exchanges/exchangesList";
import { BotsList } from "./resources/bots/botsList";

export const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={CabLogin}
      dashboard={Dashboard}
    >
      {permissions => (
        <>
          {permissions.role === "admin" ? (
            <Resource
              name="users"
              create={UserCreate}
              list={UsersList}
              edit={UserEdit}
              recordRepresentation="username"
            />
          ) : null}
          {permissions.role === "admin" ? (
            <Resource
              name="offices"
              list={OfficesList}
              create={OfficeCreate}
            />
          ) : null}
          {permissions.role === "admin" ? (
            <Resource name="exchanges" list={ExchangesList} />
          ) : null}
        </>
      )}
      <Resource name="bots" list={BotsList} />
      <CustomRoutes noLayout>
        <Route path="/registration" element={<CabRegistration />} />
      </CustomRoutes>
    </Admin>
  );
};

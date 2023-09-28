import * as React from "react";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import {
  Admin,
  CustomRoutes,
  EditGuesser,
  Resource,
  ShowGuesser
} from "react-admin";
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
// import { usePermissions } from "./permissions";

import CabLogin from "./resources/cabinet/CabLoginPage";
import CabRegistration from "./resources/cabinet/CabRegistrationPage";
import { Dashboard } from "./resources/cabinet/Dashboard";

import { ResourcesList } from "./resourcesList";
import { UsersList } from "./resources/users/usersList";
import { UserEdit } from "./resources/users/userEdit";
import { UserCreate } from "./resources/users/userCreate";
import { OfficesList } from "./resources/offices/officesList";


export const App = () => {
  return (
    <Admin
      // requireAuth
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={CabLogin}
      dashboard={Dashboard}
    >
      {permissions => (
        <>
          {permissions.role === 'admin' ? (
            <Resource
              name="users"
              create={UserCreate}
              list={UsersList}
              show={ShowGuesser}
              edit={UserEdit}
              recordRepresentation="username"
            />
          ) : null}
        </>
      )}
      <Resource name="offices" list={OfficesList} />
      <CustomRoutes noLayout>
        <Route path="/registration" element={<CabRegistration />} />
      </CustomRoutes>
    </Admin>
  );
};

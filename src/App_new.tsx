import * as React from "react";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AdminContext,
  AdminUI,
  CustomRoutes,
  DataProvider,
  localStorageStore,
  Resource,
  ListGuesser,
  Loading,
  Login,
  useDataProvider,
  usePermissions,
} from "react-admin";

import { i18nProvider } from "./i18nProvider";

import { authProvider } from "./authProvider";
import CabDataProvider from "./dataProvider";

import CabLogin from "./resources/cabinet/CabLoginPage";
import CabRegistration from "./resources/cabinet/CabRegistrationPage";
import { Dashboard } from "./resources/cabinet/Dashboard";

// Resources
import { UsersList } from "./resources/users/usersList";
import { UserEdit } from "./resources/users/userEdit";
import { UserCreate } from "./resources/users/userCreate";
import { OfficesList } from "./resources/offices/officesList";

const store = localStorageStore();

function App() {
  return (
    <AdminContext
      authProvider={authProvider}
      dataProvider={CabDataProvider}
      i18nProvider={i18nProvider}
      store={store}
    >
      <AsyncResources />
    </AdminContext>
  );
}

interface MyDataProvider extends DataProvider {
  getResources: () => Promise<{ name: string }[]>;
}

function AsyncResources() {
  const [resources, setResources] = useState<Array<{ name: string }>>(
    [] as Array<{ name: string }>
  );
  const dataProvider = useDataProvider<MyDataProvider>();

  useEffect(() => {
    // Note that the `getResources` is not provided by react-admin. You have to implement your own custom verb.
    dataProvider.getResources().then((r) => setResources(r));
  }, []);

  const { isLoading, permissions } = usePermissions();

  if (isLoading == false) {
    console.log(permissions);
    return (
      <AdminUI ready={Loading} loginPage={CabLogin} dashboard={Dashboard}>
        {/* {resources.map((resourcde) => (
        <Resource name={resource.name} key={resource.name} list={ListGuesser} />
      ))} */}
      {permissions.role === "admin" ? (
        <Resource
          name="users"
          create={UserCreate}
          list={UsersList}
          edit={UserEdit}
        />
      ) : null}
        <Resource name="offices" list={OfficesList} />
        <CustomRoutes noLayout>
          <Route path="/registration" element={<CabRegistration />} />
        </CustomRoutes>
      </AdminUI>
    );
  }
}

export default App;

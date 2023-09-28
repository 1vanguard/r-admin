import * as React from "react";

import { Resource, ShowGuesser, usePermissions } from "react-admin";
import { UsersList } from "./resources/users/usersList";
import { UserEdit } from "./resources/users/userEdit";
import { UserCreate } from "./resources/users/userCreate";
import { OfficesList } from "./resources/offices/officesList";

/* import PostIcon from "@mui/icons-material/Book"; */
import UserIcon from "@mui/icons-material/Group";

export const ResourcesList = () => {
  return (
    <>
      <Resource
        name="users"
        create={UserCreate}
        list={UsersList}
        show={ShowGuesser}
        edit={UserEdit}
        recordRepresentation="username"
        icon={UserIcon}
      />
      <Resource name="offices" list={OfficesList} />
    </>
  );
};

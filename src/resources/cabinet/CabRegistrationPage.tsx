import * as React from "react";
import { useEffect } from "react";
import {
  Create,
  PasswordInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useTranslate,
} from "react-admin";

import { authProvider } from "../../authProvider";

import Box from "@mui/material/Grid";
import Grid from "@mui/material/Grid";

const RegistrationPage = (props) => {
  const redirect = useRedirect();

  useEffect(() => {
    const navigateToHome = async () => {
      const { token } = await authProvider.getIdentity();
      if (token) {
        redirect("/");
      }
    };

    navigateToHome();
  }, [redirect]);

  const notify = useNotify(),
    translate = useTranslate();
  const onSuccess = (data) => {
    notify("registration.registrationSuccess");
    redirect(`/login`);
  };

  /* return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "black",
        backgroundImage: "url(/assets/images/backgrounds/01.jpg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Grid container spacing={2} maxWidth={300}>
        <Grid item xs={12}>
          <Create
            disableAuthentication
            resource="users"
            mutationOptions={{ onSuccess, meta: { creator_role: undefined } }}
          >
            <SimpleForm>
              <h1 style={{ margin: 0, textAlign: "center", width: "100%" }}>
                Registration
              </h1>
              <TextInput source="username" label="Username" />
              <TextInput source="email" type="email" label="E-mail" />
              <PasswordInput source="password" />
            </SimpleForm>
          </Create>
        </Grid>
      </Grid>
    </Box>
  ); */
  return (
    <div>No registration</div>
  )
};

export default RegistrationPage;

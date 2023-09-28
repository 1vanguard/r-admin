import * as React from "react";
import { useEffect } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  useNotify,
  useRedirect,
  useTranslate,
} from "react-admin";
import { authProvider } from "../../authProvider";

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
    notify('registration.registrationSuccess');
    redirect(`/login`);
  };

  return (
    <Create
      disableAuthentication
      resource="users"
      mutationOptions={{ onSuccess }}
    >
      <SimpleForm>
        <TextInput source="username" label="Username" fullWidth />
        <TextInput source="email" type="email" label="E-mail" fullWidth />
        <PasswordInput source="password" fullWidth />
      </SimpleForm>
    </Create>
  );
};

export default RegistrationPage;

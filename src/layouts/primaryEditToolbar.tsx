import * as React from "react";
import { SaveButton, Toolbar } from 'react-admin';

export const PrymaryEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);
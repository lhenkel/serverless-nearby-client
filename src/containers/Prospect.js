import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import {
    HelpBlock,
    FormGroup,
    Alert,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import "./Signup.css";


export default function Prospect() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        name: "",
        street: "",
        zip: "",
    });
    const history = useHistory();
    const [sentProspect, setSentProspect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function saveProspect() {
        return API.post("find-nearby", "/followup", {
            body: { "Type": "Prospect", "ProspectInfo": fields }
        });
    }

    function validateForm() {
        return (
            fields.name.length > 0 &&
            fields.email.length > 0
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
        saveProspect();
        setSentProspect(true);

        setIsLoading(false);

    }

    function renderSent() {
        return (
            <Alert className='mt-2' color="success">
                Added Prospect
            </Alert>
        );
    }


    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="street" bsSize="large">
                    <ControlLabel>Street (optional)</ControlLabel>
                    <FormControl
                        type="text"
                        onChange={handleFieldChange}
                        value={fields.street}
                    />
                </FormGroup>
                <FormGroup controlId="zip" bsSize="large">
                    <ControlLabel>Zip (optional)</ControlLabel>
                    <FormControl
                        type="text"
                        onChange={handleFieldChange}
                        value={fields.zip}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
        </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {sentProspect === false ? renderForm() : renderSent()}
        </div>
    );
}
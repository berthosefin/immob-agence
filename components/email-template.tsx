import * as React from "react";
import { ContactFormType } from "./contact-form";
import { Property } from "@prisma/client";

export const EmailTemplate = (data: ContactFormType, property: Property) => (
  <>
    <h1>Nouvelle demande de contact</h1>

    <p>
      Une nouvelle demande de contact a été fait pour le bien{" "}
      <strong>{property.title}</strong> par:
    </p>

    <ul>
      <li>
        <strong>Prénom: </strong>
        {data.firstname}
      </li>
      <li>
        <strong>Nom: </strong>
        {data.lastname}
      </li>
      <li>
        <strong>Téléphone: </strong>
        {data.phone}
      </li>
      <li>
        <strong>Email: </strong>
        {data.email}
      </li>
    </ul>

    <p>
      <strong>Message</strong>:
      <br />
      <i>{data.message}</i>
    </p>
  </>
);

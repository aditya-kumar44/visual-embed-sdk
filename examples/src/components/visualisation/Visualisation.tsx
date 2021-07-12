import React from "react";
import { Button, Space, notification, Spin, Modal } from "antd";
import qs from "query-string";
import {
  init,
  SearchEmbed,
  PinboardEmbed,
  AuthType,
  EmbedEvent,
} from "@thoughtspot/visual-embed-sdk";
import { useSurveySender } from "../send-survey-modal/SendSurveyModal";

import { getDataForColumnName } from "./Visualisation.util";
import "./Visualisation.css";

const queryParams = qs.parse(window.location.search);
const customHost: string = queryParams.host as string;

const thoughtSpotHost = !!customHost
  ? `https://${customHost}`
  : "https://10.87.90.95";

init({
  thoughtSpotHost,
  authType: AuthType.None,
  getAuthToken: async () => {
    return fetch(
      "http://ts-everywhere-auth.thoughtspot.com:5000/gettoken/tsadmin"
    ).then((r) => r.text());
  },
  username: "tsadmin",
});

export const Visualisation = () => {
  const embedRef = React.useRef(null);
  const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
  const { sendSurvey, modalJSX } = useSurveySender();

  React.useEffect(() => {
    if (embedRef !== null) {
      embedRef!.current.innerHTML = "";
    }

    const tsSearch = new SearchEmbed("#tsEmbed", {
      frameParams: {},
    });

    const tsVisualisation = new PinboardEmbed("#tsEmbed", {
      frameParams: {},
      pinboardId: "74852035-9624-4fac-b352-200fa8506b14",
  });

     tsVisualisation
       .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
       .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
       .on(EmbedEvent.CustomAction, (payload: any) => {
         const data = payload.data;
         if (data.id === "send-survey") {
           const recipients = getDataForColumnName(
             data.columnsAndData,
             "email address"
           );
           sendSurvey(recipients);
         }
       })
       .render();
   }, []);
  return (
    <div className="visualisation">
      {isEmbedLoading ? (
        <div className="embedSpinner">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <div className="tsEmbed" ref={embedRef} id="tsEmbed"></div>
      {modalJSX}
    </div>
  );
};

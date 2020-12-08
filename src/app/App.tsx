import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import OpenDocument from "./OpenDocument";
import OpenView from "./OpenView";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/:db/create/:template_id(/:doc_id)"
          render={(props) => {
            return (
              <OpenDocument
                db_id={props.match.params.db}
                doc_id={props.match.params.doc_id}
                edit_mode="create"
                template_id={props.match.params.template_id}
              />
            );
          }}
        />
        <Route
          path="/:db/view/:view_id"
          render={(props) => {
            return (
              <OpenView
                db_id={props.match.params.db}
                view_id={props.match.params.view_id}
              />
            );
          }}
        />
        <Route
          path="/:db/:edit_mode/:doc_id"
          render={(props) => {
            return (
              <OpenDocument
                db_id={props.match.params.db}
                doc_id={props.match.params.doc_id}
                edit_mode={props.match.params.edit_mode}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";

import ErrorBoundary from "./page/ErrorBoundary";
import OpenDocument from "./document/OpenDocument";
import OpenView from "./view/OpenView";
import Test from "./Test";

const App: React.FC<{}> = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:db/create/:template_id/:doc_id?"
            element={(props) => {
              console.log(
                `App create routing template_id: ${props.match.params.template_id}, doc_id: ${props.match.params.doc_id}`
              );
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
            element={(props) => {
              console.log(
                `App view routing view_id: ${props.match.params.view_id}`
              );
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
            element={(props) => {
              console.log(
                `App edit/show routing doc_id: ${props.match.params.doc_id}`
              );
              return (
                <OpenDocument
                  db_id={props.match.params.db}
                  doc_id={props.match.params.doc_id}
                  edit_mode={props.match.params.edit_mode}
                />
              );
            }}
          />
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/">
            <Navigate to="/databases/view/docs" />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

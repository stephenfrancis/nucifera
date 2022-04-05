import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Routes, useParams } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";

import ErrorBoundary from "./page/ErrorBoundary";
import OpenDocument from "./document/OpenDocument";
import OpenView from "./view/OpenView";
import Test from "./Test";
import { editMode } from "../types/General";

import "../public/styles.css";

const CreateRoute: React.FC<{}> = () => {
  const { db, template_id, doc_id } = useParams();
  console.log(
    `App create routing template_id: ${db}, ${template_id}, ${doc_id}`
  );
  return (
    <OpenDocument
      db_id={db}
      doc_id={doc_id}
      edit_mode="create"
      template_id={template_id}
    />
  );
};

const ViewRoute: React.FC<{}> = () => {
  const { db, view_id } = useParams();
  console.log(`App view routing view_id: ${db}, ${view_id}`);
  return <OpenView db_id={db} view_id={view_id} />;
};

const DocRoute: React.FC<{}> = () => {
  const { db, edit_mode, doc_id } = useParams();
  console.log(`App edit/show routing doc_id: ${db}, ${edit_mode}, ${doc_id}`);
  return (
    <OpenDocument
      db_id={db}
      doc_id={doc_id}
      edit_mode={edit_mode as editMode}
    />
  );
};

const App: React.FC<{}> = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/:db/create/:template_id" element={<CreateRoute />} />
          <Route
            path="/:db/create/:template_id/:doc_id"
            element={<CreateRoute />}
          />
          <Route path="/:db/view/:view_id" element={<ViewRoute />} />
          <Route path="/:db/:edit_mode/:doc_id" element={<DocRoute />} />
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Navigate to="/databases/view/docs" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

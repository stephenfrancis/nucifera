import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import Body from "../page/Mainarea";
import { renderUneditable } from "../fields/DisplayField";
import ErrorBoundary from "../page/ErrorBoundary";
import Footer from "../page/Footer";
import Header from "../page/Header";
import Loading from "../page/Loading";
import { error, info } from "../../data/Logger";
import MenuItemDatabase from "../menu/MenuItemDatabase";
import MenuItemView from "../menu/MenuItemView";
import { getStyleProperties, useEventListener } from "../Utils";
import View from "../../data/View";
import { DocContent } from "../../types/General";
import { ViewColumn } from "../../types/View";

interface Props {
  view: View;
}

const DEFAULT_WIDTH_BY_TYPE = {
  date: "m",
  number: "s",
  options: "m",
  text: "m",
};

const getWidth = (col: ViewColumn) => {
  console.log(`getWidth() for column ${col.label}`);
  return col.initialWidth || DEFAULT_WIDTH_BY_TYPE[col.field.type];
};

const renderCell = (doc: DocContent, col: ViewColumn) => {
  if (!col.field) {
    return <div>Err no col.field</div>;
  }
  return (
    <div className={`list_cell_${getWidth(col)}`} key={col.field.id}>
      {renderUneditable(col.field, doc, col.field.id)}
    </div>
  );
};

const renderHeader = (col: ViewColumn) => {
  if (!col.field) {
    return <div>Err no col.field</div>;
  }
  return (
    <div className={`list_cell_${getWidth(col)}`} key={col.field.id}>
      {col.label || col.field.id}
    </div>
  );
};

const renderHeaders = (view: View) => {
  return (
    <div className="list_header">
      {view.getColumns().map((col) => renderHeader(col))}
    </div>
  );
};

const renderRow = (view: View, doc: DocContent, selected: boolean) => {
  return (
    <Link key={doc._id} to={view.getShowLink(doc._id)}>
      <div className={"list_row" + (selected ? " list_row_selected" : "")}>
        {view.getColumns().map((col) => renderCell(doc, col))}
      </div>
    </Link>
  );
};

const renderRows = (view: View, data: DocContent[], selected: number) => {
  console.log(`renderRows() ${selected}`);
  return (
    <>{data.map((obj, index) => renderRow(view, obj, selected === index))}</>
  );
};

const DisplayView: React.FC<Props> = (props) => {
  const [data, setData] = React.useState<DocContent[]>(null);
  const [selected, setSelected] = React.useState<number>(0);
  const navigate = useNavigate();

  useEventListener(
    "keydown",
    React.useCallback(
      (event: KeyboardEvent) => {
        console.log(
          `DisplayView.handleKeyboardEvents() ${event.key}, shift? ${event.shiftKey}, alt? ${event.altKey}, meta? ${event.metaKey}`
        );
        if (event.key === "ArrowDown" && data && selected < data.length - 1) {
          console.log(`handleKeyboardEvents() about to increment ${selected}`);
          setSelected(selected + 1);
        } else if (event.key === "ArrowUp" && selected > 0) {
          console.log(`handleKeyboardEvents() about to decrement ${selected}`);
          setSelected(selected - 1);
        } else if (event.key === "Enter" && data) {
          navigate(props.view.getShowLink(data[selected]._id));
        }
      },
      [selected, data]
    )
  );

  React.useEffect(() => {
    props.view
      .execute()
      .then((results: DocContent[]) => setData(results))
      .catch((err) => {
        error(err);
      });
  }, []);

  return (
    <>
      <Header>
        <ErrorBoundary>
          <MenuItemDatabase db={props.view.getDatabase()} />
        </ErrorBoundary>
        <ErrorBoundary>
          <MenuItemView view={props.view} />
        </ErrorBoundary>
      </Header>
      <Body>
        {renderHeaders(props.view)}
        <ErrorBoundary>
          {!!data && renderRows(props.view, data, selected)}
          {!data && <Loading />}
        </ErrorBoundary>
      </Body>
      <Footer>
        <Link className="button_pri" to={props.view.getNewDocumentLink()}>
          Create a New Doc
        </Link>
      </Footer>
    </>
  );
};

export default DisplayView;

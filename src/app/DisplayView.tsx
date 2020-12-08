import * as React from "react";
import { BrowserRouter, Link, Redirect } from "react-router-dom";

import Body from "./Body";
import BurgerMenuDatabase from "./BurgerMenuDatabase";
import BurgerMenuView from "./BurgerMenuView";
import DisplayField from "./DisplayField";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import { error, info } from "../data/Logger";
import { getStyleProperties, useEventListener } from "./Utils";
import View from "../data/View";
import { ViewColumn } from "../types/View";

interface Props {
  view: View;
}

const DEFAULT_WIDTH_BY_TYPE = {
  date: "s",
  number: "s",
  options: "m",
  text: "m",
};

const getWidth = (col: ViewColumn) => {
  return col.initialWidth || DEFAULT_WIDTH_BY_TYPE[col.type];
};

const renderCell = (doc: Document, col: ViewColumn) => {
  return (
    <div className={`list_cell_${getWidth(col)}`} key={col.id}>
      {/* doc[col.id] */}
      <DisplayField
        edit_mode="show"
        field={col as Field}
        value_container={doc.getData()}
      />
    </div>
  );
};

const renderHeaders = (view: View) => {
  return (
    <>
      {view.getColumns().map((col) => (
        <div className={`list_cell_${getWidth(col)}`} key={col.id}>
          {col.label || col.id}
        </div>
      ))}
    </>
  );
};

const renderRow = (view: View, doc: any, selected: boolean) => {
  return (
    <Link key={doc._id} to={view.getShowLink(doc._id)}>
      <div className={"list_row" + (selected ? " list_row_selected" : "")}>
        {view.getColumns().map((col) => renderCell(doc, col))}
      </div>
    </Link>
  );
};

const renderRows = (view: View, data: { rows: any[] }, selected: number) => {
  console.log(`renderRows() ${selected}`);
  return (
    <>
      {data.rows.map((obj, index) =>
        renderRow(view, obj.doc, selected === index)
      )}
    </>
  );
};

const DisplayView: React.FC<Props> = (props) => {
  const [data, setData] = React.useState<any>(null);
  const [selected, setSelected] = React.useState<number>(0);
  const [redirect, setRedirect] = React.useState<string>(null);

  const handleKeyboardEvents = React.useCallback(
    (event: KeyboardEvent) => {
      console.log(
        `DisplayView.handleKeyboardEvents() ${event.key}, shift? ${event.shiftKey}, alt? ${event.altKey}, meta? ${event.metaKey}`
      );
      if (
        event.key === "ArrowDown" &&
        data &&
        selected < data.rows.length - 1
      ) {
        console.log(`handleKeyboardEvents() about to increment ${selected}`);
        setSelected(selected + 1);
      } else if (event.key === "ArrowUp" && selected > 0) {
        console.log(`handleKeyboardEvents() about to decrement ${selected}`);
        setSelected(selected - 1);
      } else if (event.key === "Enter" && data) {
        setRedirect(props.view.getShowLink(data.rows[selected].doc._id));
      }
    },
    [selected, data]
  );

  useEventListener("keydown", handleKeyboardEvents);

  React.useEffect(() => {
    props.view
      .execute()
      .then((results) => setData(results))
      .catch((err) => {
        error(err);
      });

    console.log(`resetting key event listeners`);
    window.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      window.removeEventListener("keydown", handleKeyboardEvents);
    };
  }, [selected, redirect]);

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Header>{renderHeaders(props.view)}</Header>
      <Body
        burgerMenuContent={() => (
          <>
            <BurgerMenuView view={props.view} />
            <BurgerMenuDatabase db={props.view.getDatabase()} />
          </>
        )}
      >
        {!!data && renderRows(props.view, data, selected)}
        {!data && <Loading />}
        <div className="block_p" key="button_block">
          <div className="cell">
            <Link className="button_pri" to={props.view.getNewDocumentLink()}>
              Create a New Doc
            </Link>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
};

export default DisplayView;

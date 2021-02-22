import React from 'react';
// import { SearchPath } from "./components/search/SearchPath";
// import {LixiItem} from "./components/lixi-item/LixiItem"
// import { Provider } from "react-redux";
// import { store } from "./redux";
import { CssBaseline } from '@material-ui/core';
// import { ItemXMLViewer } from './components/itemXMLViewer/ItemXMLViewer';
// import { useTypedSelector } from "./hooks/useTypeSelector";
import { VerticalLinearStepper } from "./components/vertical-stepper/VerticalStepper";
// import { useAction } from "./hooks/useActions";


function App() {
  // const { data } = useTypedSelector((state) => state.item);
  // const { customization } = useTypedSelector((state) => state.customizer);
  return (
    // <Provider store={store}>
    <div
      className="App"
      style={{ backgroundColor: "#fff", width: "70%", margin: "auto" }}
    >
      <CssBaseline />
      <VerticalLinearStepper />
      {/* <SearchPath />
      {data ? <LixiItem item={data} /> : undefined}
      {data ? <ItemXMLViewer itemXML={customization} /> : undefined} */}
    </div>
    // </Provider>
  );
}

export default App;

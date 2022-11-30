import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./reudx/prospectStatusSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});

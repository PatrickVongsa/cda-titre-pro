import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./redux/prospectStatusSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});

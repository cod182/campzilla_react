import { configureStore } from '@reduxjs/toolkit';

import { hereApiCoordLookup } from '../services/hereCoordinates';

export default configureStore({
  reducer: {
    [hereApiCoordLookup.reducerPath]: hereApiCoordLookup.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hereApiCoordLookup.middleware)

});
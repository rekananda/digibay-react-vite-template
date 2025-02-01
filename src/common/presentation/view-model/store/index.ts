import MainConstanta from '@/common/config';
import { Middleware, configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/global.slice';
import { TemplateStore } from '@/modules/template';

const loggingMiddleware: Middleware = () => (next) => (action) => {
  if (MainConstanta.env !== 'production'){
    console.log('Redux Action:', {action});
  }
  return next(action);
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      ...TemplateStore,
      global: globalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggingMiddleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
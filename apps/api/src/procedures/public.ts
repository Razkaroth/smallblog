import { t } from '../trcp';

export const publicProcedure = t.procedure.use(({ next }) => {
  return next();
});

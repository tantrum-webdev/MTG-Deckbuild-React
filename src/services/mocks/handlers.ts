import { Format } from '@/types';
import { rest } from 'msw';
import endpoints from '@/config/endpoints';

export const handlers = [
  rest.get(endpoints.formats, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<{ formats: Format[] }>({
        formats: ['Standard', 'Limited', 'Commander'],
      })
    );
  }),
];

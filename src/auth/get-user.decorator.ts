import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((_data, ctx) => {
  const req = ctx.switchToHttp().getRerquest();
  return req.user;
});

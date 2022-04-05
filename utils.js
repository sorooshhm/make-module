exports.normalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

exports.createController = (name) => {
  return `
    import { NextFunction, Request } from 'express';
    import { errorHandler } from '../../core/controller/errorHandler';
    import {  Res } from '../../core/types/Types';
    import ${name}Model from './${name}.model';
    import BaseController from 'app/core/controller/BaseController';

    class ${name}Controller extends BaseController {
      async patch(req: Request, res: Res, next: NextFunction) {}
      async delete(req: Request, res: Res, next: NextFunction) {}
    }

    export default new (errorHandler(${name}Controller))(
    ${name}Model,
    'user',
    ) as ${name}Controller;
    
    `;
};

exports.createModel = (name) => {
  return `
    import BaseSchema from '../../core/schemas/Schema';
    import * as mongoose from 'mongoose';

    const schema = new BaseSchema({}, {timestamps : true});

    const ${name}Model = mongoose.model("${name}", schema);

    export default ${name}Model;

      `;
};

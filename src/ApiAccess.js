import express from "express";
import socketIo from "socket.io";
import jwt from "jsonwebtoken";
import { version } from '../package.json';
import { masterKey } from "./config";
import controllers from "./api/controllers";
import routes from "./api/routes";

export default class ApiAccess {

  /**
   * 
   */
  constructor() {
    this._app = express();
    let app = this._app;
    app.get('/', this.serviceVersion.bind(this));
    app.use('/private', this.authMiddleware.bind(this), this.routesMapper(routes.private));
    app.use(this.routesMapper(routes.public));
    this.usersConnected = [];
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  serviceVersion(req, res, next) {
    let { version } = this;
    res.json({ version });
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  authMiddleware(req, res, next) {
    let { token } = req.headers;
    let usr = this.auth(token);
    if (!usr) {
      let e = this.errors({ code: 401 });
      res.status(e.status).json(e);
      return false;
    }
    req.auth = usr;
    next();
  }

  /**
   * 
   * @param {*} routes 
   */
  auth(token) {
    try {
      var user = jwt.verify(token, masterKey);
    } catch (error) {
      return false;
    }
    return user;
  }

  /**
   * 
   * @param {*} routes 
   */
  routesMapper(routes) {
    let app = express();
    let rm = this;
    routes.forEach(route => {
      const {
        path,
        method,
        controller,
        task
      } = route;
      app[method.toLowerCase()](path, async (req, res, next) => {
        let ctrlr = new controllers[controller]();
        let input = rm.normalize(req);
        try {
          var data = await ctrlr[task](input);
        } catch (error) {
          let e = rm.errors(error);
          return res.status(e.status).json(e);
        }
        let output = rm.done(data);
        return res.json(output);
      });
    });
    return app;
  }

  /**
   * 
   * @param {*} error 
   */
  errors(error) {
    let { code = 0 } = error;
    delete error.code;
    let e = {
      error: true,
      status: 500,
      code,
      description: error
    }
    switch (code) {
      case 403:
        e.status = 403;
        e.description = 'forbiden';
      case 401:
        e.status = 401;
        e.description = 'unauthorized';
      default:
        break;
    }
    console.error(error);
    return e;
  }


  /**
   * 
   * @param {*} data 
   */
  done(data) {
    // Use this method to normalize done response
    return data
  }

  /**
   * 
   * @param {*} req 
   */
  normalize(req) {
    // TODO: flatten query
    return {
      auth: req.auth,
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {})
    };
  }

  /**
   * 
   */
  get app() {
    return this._app;
  }

  /**
   * 
   * @param {*} server 
   */
  chatInit(server) {
    let io = socketIo(server);
    io.on('connection', (socket) => {
      //console.log(socket.id);
      let { token } = socket.handshake.query;
      let user = this.auth(token);
      if (!user) {
        socket.emit('rejected');
        return false;
      }
      let usrExist = this.usersConnected.filter(u => u.id == user.id);
      if (usrExist.length) {
        usrExist[0].sockets.push(socket);
      } else {
        user.sockets = [socket];
        this.usersConnected.push(user);
      }
      socket.emit('auth', { done: true });
      let messageC = new controllers.MessageController();
      socket.on('newMessage', async (m) => {
        let row = await messageC.set(m);
        let receiver = this.usersConnected.filter(u => u.id == m.receiverId);
        if (receiver.length) {
          receiver[0].sockets.forEach(s => {
            s.emit('newMessageReceived', row);
          });
        }
        let sender = this.usersConnected.filter(u => u.id == m.senderId);
        sender[0].sockets.forEach(s => {
          if (s.id != socket.id)
            s.emit('newMessageReceived', row);
        });
      });
    });
  }

  /**
   * 
   */
  get version() {
    return version;
  }

}

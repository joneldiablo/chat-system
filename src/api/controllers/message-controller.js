import Controller from "abstract-controller";
import { MessageModel } from "../models";

export default class MessageController extends Controller {

  /**
   * 
   */
  constructor() {
    super(MessageModel);
  }

  /**
   * 
   */
  async get(data) {
    let senderId = data.auth.id;
    let receiverId = data.receiverId;
    let messages = await MessageModel.query()
      .where({ senderId, receiverId })
      .orWhere({ senderId: receiverId, receiverId: senderId })
      .limit(50)
      .orderBy('date', 'desc');
    return messages.reverse();
  }

  /**
   * 
   * @param {*} data 
   */
  async set(data) {
    data.receiverId = parseInt(data.receiverId);
    data.senderId = parseInt(data.senderId);
    let r = await super.set({ body: data }, {}, {}, null, true);
    return r;
  }

}
import Controller from "abstract-controller";
import { UserModel } from "../models";

export default class UserController extends Controller {

  /**
   * 
   */
  constructor() {
    super(UserModel);
  }

  /**
   * 
   */
  get(data) {
    data['filters.active'] = 1;
    data.fields = 'id,userName';
    data.limit = data.limit || 1000;
    return super.get({ query: data }, {}, {}, null, true);
  }

}
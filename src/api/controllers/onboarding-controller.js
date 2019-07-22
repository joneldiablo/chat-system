import jwt from "jsonwebtoken";
import Controller from "abstract-controller";
import { UserModel } from "../models";
import { masterKey, salt } from "../../config";
import bcrypt from "bcrypt";

export default class OnboardingController extends Controller {

  /**
   * 
   */
  constructor() {
    super(UserModel);
  }

  /**
   * 
   */
  async login({ email, password }) {
    if (!email || !password) {
      throw { code: 403 };
    }
    let usr = await this.getByColumn({ query: { email } }, {}, {}, null, true);
    if (!usr) {
      throw { code: 403 };
    }
    if (!usr.active) {
      throw { code: 401 };
    }
    let passOk = await bcrypt.compare(password, usr.password);
    if (!passOk) {
      throw { code: 403 };
    }
    let token = jwt.sign({ id: usr.id }, masterKey);

    return { id: usr.id, token };
  }

  cryptPass(pass, saltIn = salt) {
    const hash = bcrypt.hashSync(pass, saltIn);
    return hash;
  }

  decryptPass(pw, hash) {
    return bcrypt.compareSync(pw, hash);
  }
}
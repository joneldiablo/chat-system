import knex from "../db";
import { AccessUserModel, ChatMessageModel } from "./access";

export default {
  UserModel: AccessUserModel.bindKnex(knex),
  MessageModel: ChatMessageModel.bindKnex(knex)
}
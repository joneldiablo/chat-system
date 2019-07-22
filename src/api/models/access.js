/**
 * File generated with objection-model-generator OMG!!!!
 */

const {
  Model
} = require('objection');

let AccessUserModel;
let ChatMessageModel;

/**
 * access_users model
 * @extends Model
 */
AccessUserModel = class extends Model {

  /**
   * @override
   */
  static get tableName() {
    return 'access_users';
  }

  /**
   * @override
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userName','email',],
      search: ['userName','email',],
      properties: {
        id: {
          type: 'integer'
        },
        userName: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        active: {
          type: 'integer'
        },
        password: {
          type: 'string'
        },
      }
    }
  }

  /**
   * @override
   */
  static get relationMappings() {
    return {
    };
  }

}

/**
 * chat_messages model
 * @extends Model
 */
ChatMessageModel = class extends Model {

  /**
   * @override
   */
  static get tableName() {
    return 'chat_messages';
  }

  /**
   * @override
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['senderId','receiverId','message',],
      search: ['message',],
      properties: {
        id: {
          type: 'integer'
        },
        senderId: {
          type: 'integer'
        },
        receiverId: {
          type: 'integer'
        },
        message: {
          type: 'string'
        },
      }
    }
  }

  /**
   * @override
   */
  static get relationMappings() {
    return {
      accessUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: AccessUserModel,
        join: {
          from: 'chat_messages.senderId',
          to: 'access_users.id'
        }
      },
      accessUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: AccessUserModel,
        join: {
          from: 'chat_messages.receiverId',
          to: 'access_users.id'
        }
      },
    };
  }

}


module.exports = {
  AccessUserModel,
  ChatMessageModel,
}
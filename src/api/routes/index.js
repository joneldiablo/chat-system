
export default {
  public: [{
    path: '/login',
    method: 'POST',
    controller: 'OnboardingController',
    task: 'login',
  }], private: [{
    path: '/users',
    method: 'GET',
    controller: 'UserController',
    task: 'get',
  },
  {
    path: '/messages/:receiverId',
    method: 'GET',
    controller: 'MessageController',
    task: 'get',
  }]
};
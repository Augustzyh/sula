import Mock from 'mockjs';

Mock.mock('/success.json', {
  code: 200,
  success: true,
  message: 'success',
  data: {
    a: 123,
  },
});

Mock.mock('/redirect.json', {
  code: 302,
  success: true,
  message: 'success',
  data: {
    redirectUrl: 'http://www.github.com',
  },
});

Mock.mock('/error.json', {
  code: 200,
  success: false,
  message: 'error',
  description: 'err desc',
  data: {},
});

Mock.mock('/bizerror.json', {
  code: 500,
  success: false,
  message: 'error',
  description: 'error desc',
});

Mock.mock('/bizerror/nomessage.json', {
  code: 500,
  success: false,
  description: 'error desc',
});

Mock.mock('/bizerror/nodesc.json', {
  code: 500,
  success: false,
  message: 'error',
});

Mock.mock('/posterror.json', {
  code: 200,
  success: false,
  message: 'error',
  data: {},
});

Mock.mock('/params.json', (req) => {
  return {
    code: 200,
    success: true,
    data: req,
  };
});

Mock.mock('/response.json', () => {
  return {
    id: 123,
  };
});

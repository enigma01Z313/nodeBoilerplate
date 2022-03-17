const getUser = (req) => {
  console.log('111111111');
  const userPromise = new Promise((resolve, reject) => {
    console.log('222222222');
    const { authorization } = req.headers;

    if(!authorization){
      console.log('3333333333');
      const error = new Error('Authorization not sent');
      reject(error)
    }
  });
};

const authorizationDef = (permission) => async (req, res, next) => {
  console.log("authorization def");
  console.log(permission);
  next();
};

const authorizationAnd = (permissions) => async (req, res, next) => {
  console.log("authorization and");
  console.log(permissions);
  next();
};

const authorizationOr = (permissions) => async (req, res, next) => {
  const user = await getUser(req);
  
  console.log(permissions);
  console.log(user);

  next();
};

module.exports = {
  def: authorizationDef,
  and: authorizationAnd,
  or: authorizationOr,
};


const www = () => "salam"
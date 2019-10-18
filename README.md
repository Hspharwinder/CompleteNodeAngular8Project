# CompleteNodeAngular8Project
Complete Node and Angular8 Project with  Crud operation and Authentication

# for validation
https://www.npmjs.com/package/node-input-validator

auth.js/app.js
 app.post('/signup', user.validation, user.signup);
 
 user.validation.js
 var validation = async (req,res,next) => {  
  v = new Validator(req.body, {
    email: 'required|email',
    password: 'required'
  });
  const matched = await v.check();
  if (!matched) {
    req.status = 422;
    req.body = v.errors;
    res.status(422).send(v.errors);
  }else{
    next();
  } 
};

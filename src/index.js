import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import {checkToken} from './middleware/authChecker';
import jwt from 'jsonwebtoken';
import api from './api';
import config from './config.json';
import User from "./models/Users";

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));
// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}));


// connect to db
initializeDb( () => {

  
  // authentication Route
  app.post ('/authenticate/', (req, res) => {
    const { userName, password } = req.body;
    if (!userName ||  !password) {
      res.status(400).json({
        message: "Required Parameters Missing"
      });
    }
    (async () => {
      try {
        let dbUser = await User.findOne({
          email:userName,
          password
        });
        if(dbUser){
          let token = jwt.sign({userName: dbUser.email,_id:dbUser._id},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          res.status(200);
          res.json({
            name:dbUser.name,
            email:dbUser.email,
            token
          })
        }else{
          res.status(401).send();
        }
      
      } catch (err) {
        console.log(err);
        res.status(500).send(); 
      }
    })();
  });
  // internal middleware for Token Validation 
  app.use('/api/v1/', checkToken);
	
	app.use('/api/v1', api({ config }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;

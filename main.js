const open = require("open");
const express = require("express");

const OAuth = require("./utils/OAuth");
const config = require("./config");

/*
  Init server
*/
const app = express();
mercedesOAuth = new OAuth(config);

app.get("/mercedeso2c", (req, res) => {
  /**
    Handles auth petitions
  */
  try{
    /*
      If the petition was correct, an authorization code should have been gived.
    */
    const authCode=req.query.code;
    if(!authCode)
      throw new Error(`${req.query.error}:${req.query.error_description}`)

    /*
      Gets a token for the session. This I suppose should be in front end, because it also saves the token.
    */
    mercedesOAuth.getToken(authCode, (v) => {
      res.send("Succesfully logged in!");
    });
  }catch(e){
    res.send(e);
  }
});
app.listen(3000);

/*
  Front-end part, for testing purposes.
*/

open(mercedesOAuth.getAuthorizeUrl());
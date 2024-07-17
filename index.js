const express = require("express");
const https =require("https");

const bodyparser = require("body-parser");

var app =express();


app.use(bodyparser.urlencoded({extended:true}));

   //app.use(express.static("public"));
   app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(request,response){
   response.sendFile(__dirname+"/Newspaper.html");

  
});

app.post("/",function(req,res){
    const firstn=req.body.first;
    const lastn=req.body.last;
    const email=req.body.email;

    const data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstn,
                  LNAME: lastn
              }
          }
      ]
  };

const jsondata =JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/126a0d9b40 ";

const options = {
  method: 'POST',
  auth:"sacah:3875e9988eae38756edcf396227ab068-us13"
};


     const request= https.request(url,options,function(respose){
        respose.on("data",function(data){

          if(respose.statusCode===200){
            res.sendFile(__dirname+"/success.html");
          }
          else{
            res.sendFile(__dirname+"/failure.html");
          }
            console.log(JSON.parse(data));
        })
      })

      app.post("/failure",function(rq,re){
        re.redirect("/");
      })
      request.write(jsondata);
      request.end();
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is started ")
});



//API 
// 3875e9988eae38756edcf396227ab068-us13


//list 
// 126a0d9b40  
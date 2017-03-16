"use strict";
var bodyParser = require('body-parser');
var nForceAuth = require('nforce'),
Promise = require('promise'),
SFclientId ='3MVG9ZL0ppGP5UrC1Ggmez0HgkzZxipf0FnIhOagC9G0uHXP9RR5OCcnZyg3A1E.GUVgZATwZH27ZFNc0jnIu',
SFSecret ='6250538536975468324',
SFusername ='nizam.development@awsquality.com',
SFpassword ='G00gle@12345';

var AccessToken = '';
var connection = nForceAuth.createConnection({
	clientId: SFclientId,
	clientSecret: SFSecret,
	redirectUri: 'http://localhost:3000/oauth/_callback',
	mode: 'single',
	autoRefresh:true});

connection.authenticate({ username: SFusername, password: SFpassword }, function(err,resp){
	 if (err) {
         console.log("Authentication error - " + err);
     } else {
         console.log('Authentication successful. Cached Token: ' + connection.oauth.access_token);
         AccessToken = resp.access_token;
         console.log('Authentication Access: ' + AccessToken);
     }
});

 var IntialIntract = function(Id)
{
	return new Promise(function(resolve, reject){
		
		var acc = connection.createSObject('Account');
acc.set('Name', 'Spiffy Cleaners');
acc.set('Phone', '800-555-2345');
acc.set('SLA__c', 'Gold');

connection.insert({ sobject: acc, oauth: connection.oauth }, function(err, resp){
  if(!err) console.log('It worked!');
});
		
		
	connection.query({query: "SELECT Name, Amount, ContactId__r.Name, ContactId__r.MobilePhone FROM Opportunity where ContactId__r.Id ='0032800000uyn25AAA'" }, function(err, res) 
			{
	    if(err)
	    { console.error(err);
	    	reject("AnError Occured");}
	    	    else { 
	    	    	var contact = res;
			    console.log('Authentication Access: ' + AccessToken);
	    	    	console.log("QUERY RESULT");
	    	    	console.log(contact);
	   resolve(res.records);
	   }
	   });
	});
};



exports.IntialIntract = IntialIntract;
exports.connection = connection;
exports.AccessToken = AccessToken;


# Security

## Authentication vs Authorization

Authentication is about validating your credentials such as Username/User ID and
password to verify your identity.  

Authorization occurs after your identity is successfully authenticated by the
system, which therefore gives you full access to resources such as information,
files, databases, funds, etc.  

## Password storage

Passwords are stored with password_hash() provided by Codeigniter and are
verified using password_verify().  

The password_hash function adds a salt before performing the hash.  

## Sessions and user data

User related session variables are encrypted. - Session variables can only be
accessed from the server.  

We originally had plans to implement a "remember me" function, but it's scary
insecure! It'd be very easy for an attacker to decrypt a cookie on the end user's
local machine.. it's just not worth it. User's will be advised to use a password
manager like Google's Password Manager.

## Form and data submission

All form submissions are authorized with user tokens generated at login times
The user tokens are encrypted in the session variable and hashed in the database.   

#### References
https://www.codeigniter.com/user_guide/general/security.html?highlight=password  
https://medium.com/datadriveninvestor/authentication-vs-authorization-716fea914d55  

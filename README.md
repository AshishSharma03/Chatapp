# Chatapp
# follow steps 
# step 1: cd testapp
# step 2: npm start (start react server or run the app)
# step 3: now open server directory in bash terminal -(cd server)
# step 4: now start server - nodemon .

note : 
if app not work go to inside component directory which is inside testapp directory and open
chat.js(socket.io-client side) and change the value of ENDPOINT to loaclhost:4000.
now you will need to littile changes in server-side.now go to server 
dirctory and open index.js and change value of cors origin to localhost:3000.

for run in external device:
if you want to run app in external device you also need to change localhost:4000 into your ip "yourip:4000" 
in client side and same need to littile changes in server side change value of cors origin to "yourip:3000".

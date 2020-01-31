# WhatsAppLite
iOS and Android messaging application 

## Execution
To run this application, you first need to install Expo on your machine. Once you've done that, clone this repository and install all of its dependencies using yarn or npm. Then, edit the `apiBaseUrl` constant in `api.js` and `socket.js` to reflect your local machine's public facing IP address at this time. If you don't know your IP address, you can find it using this command `ifconfig | grep "inet " | grep -v 127.0.0.1` (the first address is your public facing IP address). Start the server (https://github.com/mdesilva/whatsapplite-server). Then, run the application using the command `expo start`. 

Note: Your IP address may change from time to time. If you get an error that a network request failed, you need to lookup your IP address again and edit the `apiBaseUrl` constants. 

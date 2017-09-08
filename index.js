const { spawn } = require('child_process');
const express = require('express');
const app = express();
var state = true;
var proc = '';



app.listen(8080, ()=>{
  console.log('Example app listening on port 3000!');
});
app.get('/stop', function (req, res) {
  	res.send('Miner Stopped');

});


const start = ()=>{
    state = true;
    proc = spawn('./opt/minergate-cli/express', ['-user', 'ian10_141@yahoo.com.br', 'xmr', '1']);
    proc.on('close', () => {
      console.log('child process exited');
      state = false;
    });
}
setInterval(function(){
  start();
  setTimeout(function(){
    proc.kill('SIGINT');
  }, 3*60*1000);
}, 12*60*1000);

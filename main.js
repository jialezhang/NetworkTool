global.$ = $;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');
var shell = require('nw.gui').Shell;
var fs = require('fs');
$(document).ready(function() {
  var set_up_net = "ifconfig wlp6s0 up";
  var comm1 = 'iwlist wlp6s0 scan | grep ESSID | sed "s/ESSID://"';
  var connect = 'wpa_supplicant -iwlp6s0 -c /etc/wpa_supplicant/wpa_supplicant.conf';
  var child = exec(set_up_net,function(err,stdout,stderr){
    if(err)  throw err;
    var child = exec(comm1,function(err,stdout,stderr){
      // fs.writeFile('./test',stdout,function(err){
      //   if(err) throw err;
      //   console.log('file created success');
      // });
      var hotpots = stdout.split('\n');
      console.log("hotpots.length"+hotpots.length);
      var wireless = '';
      //字符串处理的问题造成多了
      for(var i = 0;i < hotpots.length-1;i++){
        hotpots[i] = hotpots[i].replace(/(\s+|\s+$)/g," ");
        console.log(hotpots[i]);
        wireless += '<button class = "btn hotpot">'+hotpots[i]+'</button><br/>';
      }
      $('.wireless').html(wireless);
      $('.wireless > .hotpot').click(function(e){
        var password = "<input type='text' placeholder='password' id = 'psssword'/><br/><button type='submit' class='btn'>submit</button>";
        $('.gather_info').append(password);
        $('#password').keydown(function(e){
          console.log(e.keyCode);
        });
        // var connect_cmd = exec(connect,function(err,stdout,stderr){
        //   if(err) throw err;
        // });
      });
    });
  });
});

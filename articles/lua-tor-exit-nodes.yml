title: Lua code complete to identify Tor exit nodes
tags: lua, tor, programming

---
I've been working on what I call TorBlock for a while now in an effort to understand the Lua language and the luasocket library better. Tor is a system that allows end users to use other users networks to anonymize their traffic. While there are several legitimate reasons for using Tor, it is safe to say that most website owners do not want visitors using Tor to access their server. This could be for several reasons, specifically to hinder hacking attempts. Below is the Lua source code as it stands. I am working on both a lighttpd module and an apache module to embed the Lua logic into. I will also work on something for IIS, but that will require more research in how filtering works internally.

```` lua
#!/usr/bin/lua
io = require("io");
http = require("socket.http");
ltn12 = require("ltn12");
 
-- Function to reverse ip octets
function ReverseIPOctets(_ip)
    local octets = {}; 
    string.gsub(_ip .. ".", "([%d]*)[%.]", function(_s)
	table.insert(octets,_s);
    end);
    return octets[4] .. "." .. octets[3] .. "." .. octets[2] .. "." .. octets[1];
end
 
-- Get the current WAN address for this machine
function GetPublicFacingIP()
  local html = {};
  local request = http.request {
    url = "http://checkip.dyndns.org/",
    sink = ltn12.sink.table(html)
  };
  html = tostring(table.concat(html));
  local ip = "";
  for match in string.gmatch(html, "([%d]+)([%.]*)") do
    ip = ip .. match .. ".";
  end

  return ip;
end
 
-- Test for actual node
function TestExitNode()
  local socket = require("socket");
  local addr = ReverseIPOctets(arg[1]) .. "." .. "80" .. "." ..
    GetPublicFacingIP() .. "ip-port.exitlist.torproject.org";
    
  if socket.dns.toip(addr) == nil then
    print("false");
  else
    print("true");
  end
end
   
-- Get argument IP
if #arg ~= 1 then
  print("Too many or too few arguments.");
  os.exit();
end
 
TestExitNode();
````

If you wanted to test the code using PHP, you could write something like this:
```` php
<?php
 
  // Get ip
  $ip = $_SERVER["REMOTE_ADDR"];

  // Echo the result
  echo shell_exec("lua TorBlock.lua " . $ip);
 
?>
````
...

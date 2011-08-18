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

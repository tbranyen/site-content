title: 'Lua code complete to identify Tor exit nodes'
tags: ['lua', 'tor', 'programming']
code: { tor: 'tor.lua', bootstrap: 'bootstrap.php' }

I've been working on what I call TorBlock for a while now in an effort to understand the Lua language and the luasocket library better. Tor is a system that allows end users to use other users networks to anonymize their traffic. While there are several legitimate reasons for using Tor, it is safe to say that most website owners do not want visitors using Tor to access their server. This could be for several reasons, specifically to hinder hacking attempts. Below is the Lua source code as it stands. I am working on both a lighttpd module and an apache module to embed the Lua logic into. I will also work on something for IIS, but that will require more research in how filtering works internally.

{{code.tor|script 'lua'}}

If you wanted to test the code using PHP, you could write something like this:

{{code.bootstrap|script 'php'}}

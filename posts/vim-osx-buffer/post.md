title: 'OS X Vim control-6 buffer toggling fix'
tags: ['vim', 'xml', 'osx']
posted: new Date('9/18/2012')

I recently obtained a new Retina MacBook Pro which will be my new development
box, but was annoyed to remember that `Terminal.app` does not play well with
the VIM feature, `Control + 6` to toggle between two active buffers.

After talking in `irc.freenode.com#vim` and not getting answers, I Google'd
harder and found this
[StackExchange](http://apple.stackexchange.com/questions/24261/how-do-i-send-c-that-is-control-slash-to-the-terminal)
discussion which explains clearly the issue is that
non-standard escape sequences are necessary.  The solution is to use
`Control + Shift + 6`.  This is annoying and unnecessary with the following
fix I discovered after talking with my co-worker [Dan Heberden](http://danheberden.com/).

Dan recommended I look into
[keyremap4macbook](https://github.com/tekezo/KeyRemap4MacBook) which turned out
to be exactly what was necessary in order to remap.  Unfortunately, it's not
exactly self-explanatory how to configure custom key sequences.

![KeyRemap4MacBook](/post/os-x-vim-control-6-buffer-toggling-fix/assets/keyremap.png)

### Easy Fix ###

1. Click Misc & Uninstall tab.
2. Click open private.xml and from that Finder window, open in a text editor.
3. Replace the contents of that file with something like:<br><br>
{{'private.xml'|render}}
4. Head to the Change Key and click ReloadXML.
5. Click VIM Fix that now shows up in the remapping list.

So yeah, thats all there is to it.  Hope this helps others out in the same
boat.

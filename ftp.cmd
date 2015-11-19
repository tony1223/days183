@echo off
set user=scars
set pass=scarspw
set host=0.0.0.0
set local=dist
set remote=/remote/path
set protocol=sftp
set key=ssh-rsa 2048 79:4a:85:24:db:85:69:01:72:91:b5:81:35:71:6c:86

if %protocol%==sftp (set key= -hostkey=""%key%"") else (set key=)
start "" "C:\Program Files (x86)\WinSCP\WinSCP.exe" /console /command^
 "open %protocol%://%user%:%pass%@%host%/%key%"^
 "synchronize remote %local% %remote%"^
 "close"^
 "exit"

* Enable cgi module on Apache (https://code-maven.com/set-up-cgi-with-apache)
* add skript sugarsketcher.cgi to /usr/lib/cgi-bin/ and make it executable (chmod +x ...)
* reload apache configuration (service apache2 reload)
* make skript GlycoCT2string.sh executable (chmod +x)
* edit /usr/lib/cgi-bin/sugarsketcher.cgi and set correct path to GlycoCT2string.sh skript (SCRIPTPATH)
* install cmake
* create some temporary folder
* create folder where to install obabel (/opt/obabel)
* install Open Babel (using included skript installObabel.sh <path_to_temporary_folder> <installation_path>)
* if you choosed another installation path, you must change every occurence in GlycoCT2string.sh skript
* install marvin:
 - wget http://dl.chemaxon.com/marvin/18.25.0/marvin_linux_18.25.deb
 - sudo dpkg -i marvin_linux_18.25.deb
* deploy js app (2 options)
a) edit menu.js (variable smilesinchiconvertbackendurl to correct backend url), build (gulp webpack) and copy js app files to designated location
b) copy already buil js app files to designated location and edit menu.js (variable smilesinchiconvertbackendurl to correct backend url)


SN-UIPage-Boilerplate
===============

While ServiceNow allows for the development of UI Pages within its web user interface, I prefer to code in VIM or Atom. This boilerplate simplifies my previous copy/paste from VIM to SN development process. There are four files that you would work with in the src directory: html.html, data.js, client\_script.js, and processing\_script.js.

* html.html - This is where you would author the contents of the 'html' field
* data.js - This is a special file. Anything in this file will be encapulated in a <g:evaluate> tag in the final ui_page.xml file. 
* client_script.js - The contents of this file are first run through Babel (so go write ES6 goodness) and will be set to the 'client_script' field on the UI Page 
* processing_script.js - Same as client_script.js as it is run through Babel and set to the 'processing_script' field on the UI Page
 
You will also need to set values found in build_props.json for your instance, username, password, ui page sys_id, and the scope sys_id if you are developing a UI Page for a Custom Application.

Gulp Tasks
----------

* default - builds all the files into the _dist_ directory
* deploy - builds all the files and deploys them to you ServiceNow instance
* watch - watches for changes and deploys them to your ServiceNow instance.

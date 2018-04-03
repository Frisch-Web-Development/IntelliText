# IntelliText
### A smart text editor built by two high school seniors.

## Steps:
1. Build a Spring MVC Controller
2. Build a Basic Text Editor
3. Login System / User DB and File Directory / Storage DB
4. Annotations and Cards API
5. Polish

### 9/6
First day at work. Started work with the google authentication API.

### 9/14
Login system works, login page looks presentable.

### 9/27
Login system still works. Working on security and file system.

### 10/3
Use an AJAX Post request with Google's tokenID to send to the Controller (Request Mapping) and create the principal object (TODO)

### 11/16

Our User Controller Works, started work on the Storage Controller for sending and recieving files.

### 11/20

Storage page is up and running. Just need to connect it to our storage controller.

### 11/24

Storage page needs more work and the controller points to null files. Bug fixes.

### 11/27

Storage fetch and send now works, Database keeps track of user files. Bug fixes.

### 11/28 

Cards are now representing files on the files page:

![alt text](screenshots/screenshot1128.PNG "11/28")

### 11/29

Starting work on folders

### 12/4

Added folder creation UI, added https://github.com/Frisch-Web-Development/FilePageTests, and started work on the Files page.

### 12/11

Storage page is fully implemented, working on dynamic folders and Greg started the editor page!

### 12/12

Need to work on unique IDs for the files

### 12/14

Sorting is harder than we thought. Added a new package dedicated to generating the HTML for the accordion folder.

### 2/6

Accordion.js (https://github.com/gkgkgkgk/Accordion.js) is implemented into the project. Further Improvements on the editor itself were made.

### 2/8

@googledrive we're coming for you.

### 2/13

Ok, the system officially works (most of the time). Needs to be cleaned up

### 2/13 \#2

The "text" part of IntelliText is fully functioning.

### 3/6

*TODO:*
-Clean up file system
  -Add items amount, size, details 
-Custom Context Menu
-Cards system
-APIs

### 3/14
New file system underway, working on a per level generation system. Main editor is getting a cards system soon.

### 3/20
Storage system is getting a url parameter feature.

### 4/3
Cards are making a lot of progress, over @ https://github.com/Frisch-Web-Development/javascript-library-for-cards. The file system is very close to finished, just some features such as drag and drop need to be fleshed out.

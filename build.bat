set releaseDir=bin-release

set indexFile=release.html

rmdir %releaseDir% /s/q
md %releaseDir%

copy %indexFile% %releaseDir%\
ren %releaseDir%\%indexFile% index.html

xcopy src %releaseDir%\src\ /y/s

mkdir %releaseDir%\src\zui\

java -jar compiler.jar ^
--js %releaseDir%\src\js\ZUI.js ^
--js %releaseDir%\src\js\core\Lang.js ^
--js %releaseDir%\src\js\components\Accordion.js ^
--js %releaseDir%\src\js\components\CheckBox.js ^
--js %releaseDir%\src\js\components\ComboBox.js ^
--js %releaseDir%\src\js\components\Input.js ^
--js %releaseDir%\src\js\components\Menu.js ^
--js %releaseDir%\src\js\components\MenuBar.js ^
--js %releaseDir%\src\js\components\PopWin.js ^
--js %releaseDir%\src\js\components\Slider.js ^
--js %releaseDir%\src\js\components\TextArea.js ^
--js %releaseDir%\src\js\components\ColorPicker.js ^
--js %releaseDir%\src\js\components\Pointer.js ^
--js %releaseDir%\src\js\ZUI.jQuery.js ^
--js_output_file %releaseDir%\src\zui\zui.0.0.1.min.js

rmdir %releaseDir%\src\js /s/q

copy %releaseDir%\src\css\zui.css+^
%releaseDir%\src\css\accordion.css+^
%releaseDir%\src\css\button.css+^
%releaseDir%\src\css\checkbox.css+^
%releaseDir%\src\css\combobox.css+^
%releaseDir%\src\css\input.css+^
%releaseDir%\src\css\menubar.css+^
%releaseDir%\src\css\popwin.css+^
%releaseDir%\src\css\textarea.css+^
%releaseDir%\src\css\colorpicker.css+^
%releaseDir%\src\css\pointer.css+^
%releaseDir%\src\css\slider.css+^
%releaseDir%\src\css\animate.css ^
%releaseDir%\src\zui\zui.css /b

java -jar yuicompressor.jar --type css ^
%releaseDir%\src\zui\zui.css ^
-o %releaseDir%\src\zui\zui.0.0.1.min.css

rm %releaseDir%\src\zui\zui.css
rmdir %releaseDir%\src\css /s/q
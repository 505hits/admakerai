@echo off
echo ========================================================
echo DETECTED ISSUE: You are logged in as 'removewatermar'
echo BUT this project belongs to '505hits'.
echo ========================================================
echo.
echo We will now try to push by IGNORING your saved password.
echo This should make a login window pop up.
echo.
echo PLEASE LOG IN AS THE USER WHO OWNS '505hits'
echo.
git -c credential.helper= -c credential.helper=selector push origin main
if %errorlevel% neq 0 (
    echo.
    echo Still failed? You might need to open "Credential Manager" in Windows
    echo and delete the entry for "git:https://github.com".
)
pause

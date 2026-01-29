@echo off
echo Pushing changes to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo detailed error above.
    echo If you see a Permission Denied (403) error, you need to sign in.
    echo.
)
pause

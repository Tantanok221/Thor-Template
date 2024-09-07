@echo off
echo Merging and copying environment files...

REM Python executable
set PYTHON=python

REM Merge and copy .env files for be subdirectories
for /d %%d in (be\*) do (
    %PYTHON% merge_env.py .env .env.be "%%d\.env"
    %PYTHON% merge_env.py .env .env.be "%%d\.dev.vars"
)

REM Merge and copy .env files for fe subdirectories
for /d %%d in (fe\*) do (
    %PYTHON% merge_env.py .env .env.fe "%%d\.env"
)

REM Copy .env to pkg subdirectories
for /d %%d in (pkg\*) do (
    copy .env "%%d\.env"
)

echo Environment files merged and copied successfully.
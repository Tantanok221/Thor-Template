@echo off
echo Merging and copying environment files...

REM Python executable
set PYTHON=python

REM Merge and copy .env files for fe and be directories
%PYTHON% merge_env.py .env .env.fe fe\.env
%PYTHON% merge_env.py .env .env.be be\.env
%PYTHON% merge_env.py .env .env.be be\.dev.vars

REM Copy .env to pkg directory
copy .env pkg\.env

REM Merge and copy .env files for all projects in fe directory
for /d %%d in (fe\*) do (
    %PYTHON% merge_env.py .env .env.fe "%%d\.env"
)

REM Merge and copy .env files for all projects in be directory
for /d %%d in (be\*) do (
    %PYTHON% merge_env.py .env .env.be "%%d\.env"
    %PYTHON% merge_env.py .env .env.be "%%d\.dev.vars"
)

echo Environment files merged and copied successfully.
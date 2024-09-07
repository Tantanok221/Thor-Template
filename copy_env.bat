@echo off
echo Merging and copying environment files...

REM Python executable
set PYTHON=python

REM Merge and copy .env files for backend (be) subdirectories
for /d %%d in (be\*) do (
    %PYTHON% merge_env.py .env .env.be "%%d\.env"
    %PYTHON% merge_env.py .env .env.be "%%d\.dev.vars"
)

REM Merge and copy .env files for frontend (fe) subdirectories
for /d %%d in (fe\*) do (
    %PYTHON% merge_env.py .env .env.fe "%%d\.env"
)

REM Copy .env to pkg subdirectories (no merge)
for /d %%d in (pkg\*) do (
    copy .env "%%d\.env"
)

REM Generate TypeScript constants file using .env.temp (do not modify .env)
%PYTHON% merge_env.py .env .env.be .env.temp generate_ts

REM Cleanup .env.temp file
if exist .env.temp del .env.temp

echo Environment files merged and copied successfully.
echo TypeScript constants file generated in pkg/env/src/index.ts
echo Temporary files cleaned up.

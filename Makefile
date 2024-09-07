# Detect the operating system
ifeq ($(OS),Windows_NT)
    detected_OS := Windows
else
    detected_OS := $(shell uname -s)
endif

# Python executable
PYTHON := python

.PHONY: copy-env

all: copy-env

copy-env:
	@echo "Detected OS: $(detected_OS)"
ifeq ($(detected_OS),Windows)
	@echo "Running Windows batch file..."
	@cmd /c copy_env.bat
else
	@echo "Merging and copying environment files..."
	@$(PYTHON) merge_env.py .env .env.fe fe/.env
	@$(PYTHON) merge_env.py .env .env.be be/.env
	@$(PYTHON) merge_env.py .env .env.be be/.dev.vars
	@cp .env pkg/.env
	@find fe -type d -exec $(PYTHON) merge_env.py .env .env.fe {}/.env \;
	@find be -type d -exec $(PYTHON) merge_env.py .env .env.be {}/.env \;
	@find be -type d -exec $(PYTHON) merge_env.py .env .env.be {}/.dev.vars \;
	@echo "Environment files merged and copied successfully."
endif
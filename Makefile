# Detect the operating system
ifeq ($(OS),Windows_NT)
    detected_OS := Windows
else
    detected_OS := $(shell uname -s)
endif

# Python executable
PYTHON := python
all: copy-env
.PHONY: copy-env

copy-env:
	@echo "Detected OS: $(detected_OS)"
ifeq ($(detected_OS),Windows)
	@echo "Running Windows batch file..."
	@cmd /c copy_env.bat
else
	@echo "Merging and copying environment files..."
	@for dir in be/*; do \
		if [ -d "$$dir" ]; then \
			$(PYTHON) merge_env.py .env .env.be "$$dir/.env"; \
			$(PYTHON) merge_env.py .env .env.be "$$dir/.dev.vars"; \
		fi; \
	done
	@for dir in fe/*; do \
		if [ -d "$$dir" ]; then \
			$(PYTHON) merge_env.py .env .env.fe "$$dir/.env"; \
		fi; \
	done
	@for dir in pkg/*; do \
		if [ -d "$$dir" ]; then \
			cp .env "$$dir/.env"; \
		fi; \
	done
	@echo "Environment files merged and copied successfully."
endif
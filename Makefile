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

create-vault:
	npx dotenv-vault new
	npx dotenv-vault login
	npx dotenv-vault push
	
copy-env:
	@echo "Detected OS: $(detected_OS)"
ifeq ($(detected_OS),Windows)
	@echo "Running Windows batch file..."
	@cmd /c copy_env.bat
else
	@echo "Merging and copying environment files..."
	# Merge base .env with .env.be into backend directories, but don't modify .env
	@for dir in be/*; do \
		if [ -d "$$dir" ]; then \
			$(PYTHON) merge_env.py .env .env.be "$$dir/.env"; \
			$(PYTHON) merge_env.py .env .env.be "$$dir/.dev.vars"; \
		fi; \
	done
	# Merge base .env with .env.fe into frontend directories, but don't modify .env
	@for dir in fe/*; do \
		if [ -d "$$dir" ]; then \
			$(PYTHON) merge_env.py .env .env.fe "$$dir/.env"; \
		fi; \
	done
	# Only copy .env to pkg directories (do not merge or modify it)
	@for dir in pkg/*; do \
		if [ -d "$$dir" ]; then \
			cp .env "$$dir/.env"; \
		fi; \
	done
	# Generate TypeScript interfaces, but don't modify .env
	@$(PYTHON) merge_env.py .env .env.be .env.temp generate_ts
	@rm -f .env.temp
	@echo "Environment files merged and copied successfully."
	@echo "TypeScript constants file generated in pkg/env/src/index.ts"
endif

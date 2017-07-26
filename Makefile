NODE_DIR=node_modules
NODE_BIN_DIR=$(NODE_DIR)/.bin


.PHONY: all
all: init check


.PHONY: auth
auth:
	$(NODE_BIN_DIR)/gapps auth client_secret.json


.PHONY: clean
clean:

.PHONY: distclean
distclean: clean
	rm -rf $(NODE_DIR)


.PHONY: check
check: check-lint

.PHONY: check-lint
check-lint:
	$(NODE_BIN_DIR)/eslint src


.PHONY: deploy
deploy:
	$(NODE_BIN_DIR)/gapps upload


.PHONY: init
init: $(NODE_DIR)

$(NODE_DIR):
	yarn

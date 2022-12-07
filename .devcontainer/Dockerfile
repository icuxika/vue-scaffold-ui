ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends fzf silversearcher-ag \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

ARG VUE_CLI_VERSION
RUN su node -c "umask 0002 && npm install -g @vue/cli@${VUE_CLI_VERSION} http-server yrm"

WORKDIR /app

EXPOSE 8080
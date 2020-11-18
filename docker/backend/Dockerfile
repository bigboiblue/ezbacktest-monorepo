FROM node:10.16.3

LABEL maintainer="kyle.blue.nuttall@gmail.com"

RUN apt-get update && \
	apt-get install --yes git wget zsh && \
	chsh -s /usr/bin/zsh root && \
	wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

EXPOSE 8081
ENV PORT=8081
EXPOSE 25585
ENV DEBUG_PORT=25585

WORKDIR /app

ENTRYPOINT /app/docker/node_server/container_startup.sh
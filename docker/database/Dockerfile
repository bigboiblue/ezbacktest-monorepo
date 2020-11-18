FROM debian:10.1

LABEL maintainer="kyle.blue.nuttall@gmail.com"

RUN apt update && \
	apt -y install gnupg2 git wget && \
	wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - && \
	echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb-org.list && \
	apt update && \
	apt -y install mongodb-org

RUN apt-get update && \
	apt-get install --yes git wget zsh && \
	chsh -s /usr/bin/zsh root && \
	wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

EXPOSE 27017
ENV DB_PORT=27017

WORKDIR /app

ENTRYPOINT /app/docker/mongodb/container_startup.sh
FROM node:14.4

LABEL maintainer "Kyle Blue"

RUN apt-get update && \
    apt-get install --yes git wget zsh && \
    chsh -s /usr/bin/zsh root && \
    wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh


EXPOSE 8080
ENV PORT=8080

WORKDIR /app

CMD /bin/zsh
#!/bin/zsh
yarn

if (( $# == 0 )); then
    echo "Running ZSH..."
    command /bin/zsh
else
    echo "Running command: $1"
    command $1
fi


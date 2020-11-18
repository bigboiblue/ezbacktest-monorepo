#!/bin/zsh

if (( $# == 0 )); then
    echo "Running Mongo Daemon..."
    # By default mongod should listen on all interfaces 
    # (but here for some reason it doesn't [only local] so --bind_ip_all is required)
    command mongod --fork --logpath /var/log/mongodb.log --bind_ip_all
    echo "Running ZSH and handing over control..."
    exec /bin/zsh
else
    echo "Running command: $1"
    command $1
fi

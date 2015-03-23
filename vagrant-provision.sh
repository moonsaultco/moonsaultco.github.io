#!/usr/bin/env bash

apt-get update
apt-get install -y curl wget build-essential software-properties-common

curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh \
      | NVM_DIR=/usr/local/nvm bash

chmod 2775 /usr/local/nvm

source /usr/local/nvm/nvm.sh

nvm install 0.10
nvm use 0.10

NVM_CMD="nvm use 0.10"
if grep -Fxq "$NVM_CMD" my_list.txt
then
  echo "nvm installed"
else
  echo "source /usr/local/nvm/nvm.sh" >> /home/vagrant/.profile
  echo $NVM_CMD >> /home/vagrant/.profile
fi

# node specific stuff
npm install -g grunt-cli nodemon coffee-script

# install rvm, this is a little fucked
curl -sSL https://get.rvm.io | bash -s $1
rvm install 2.2.1
rvm use 2.2.1 --default

gem install bundler jekyll

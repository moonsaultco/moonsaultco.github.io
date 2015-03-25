#!/usr/bin/env bash

apt-get update
apt-get install -y grep curl wget build-essential software-properties-common

# run as the vagrant user to get these installs to work correctly
su vagrant <<'EOF'
# rvm and ruby
curl -sSL https://get.rvm.io | bash -s $1

# node
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | sh
export NVM_DIR="/home/vagrant/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 0.10
nvm alias default 0.10

# app specifc
npm install -g grunt-cli nodemon coffee-script
EOF

echo "All done installing!

Next steps: type 'vagrant ssh' to log into the machine."

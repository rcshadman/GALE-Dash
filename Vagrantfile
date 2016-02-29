# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8000, host: 8000,
  auto_correct: true

  config.vm.synced_folder ".", "/home/vagrant/gale-dash"
  config.ssh.forward_agent = true


  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "2048"
    vb.cpus = 2
  end

  $SERVER_SETUP = <<-SCRIPT
    #Set shell to noninteractive
    export DEBIAN_FRONTEND=noninteractive

    # Fetch latest Repo Data
    apt-get update

    # Install System Requirements
    apt-get install -y build-essential
    apt-get install -y libreadline6-dev
    apt-get install -y libyaml-dev
    apt-get install -y libsqlite3-dev
    apt-get install -y sqlite3
    apt-get install -y autoconf
    apt-get install -y libgdbm-dev
    apt-get install -y libncurses5-dev
    apt-get install -y automake
    apt-get install -y libtool
    apt-get install -y bison
    apt-get install -y libffi-dev
    apt-get install -y postgresql-client
    apt-get install -y postgresql-contrib
    apt-get install -y npm
    apt-get install -y virtualenvwrapper
    apt-get build-dep -y psycopg2
    apt-get build-dep -y pillow
    apt-get build-dep -y python-lxml
    apt-get build-dep -y memcached
  SCRIPT

  $NODE_SETUP = <<-SCRIPT
    # Install Latest Nodejs
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo ln -s `which nodejs` /usr/local/bin/node
  SCRIPT

  $DATABASE_SETUP = <<-SCRIPT
    sudo -u postgres psql -c "CREATE ROLE vagrant WITH LOGIN SUPERUSER PASSWORD 'vagrant';"
    sudo -u postgres psql -c "CREATE DATABASE vagrant WITH OWNER vagrant;"
    sudo -u postgres psql -c "CREATE ROLE galedash WITH LOGIN SUPERUSER PASSWORD 'galedash';"
    sudo -u postgres psql -c "CREATE DATABASE galedash WITH OWNER galedash;"
  SCRIPT

  $VIRTUALENV_SETUP = <<-SCRIPT
    source /usr/share/virtualenvwrapper/virtualenvwrapper.sh
    mkvirtualenv galedash
    workon galedash
    cd /home/vagrant/gale-dash/server/
    pip install -r requirements/development.txt
  SCRIPT


  config.vm.provision "shell", inline: $SERVER_SETUP, privileged: true
  config.vm.provision "shell", inline: $NODE_SETUP, privileged: false
  config.vm.provision "shell", inline: $DATABASE_SETUP, privileged: false
  config.vm.provision "shell", inline: $VIRTUALENV_SETUP, privileged: false
end

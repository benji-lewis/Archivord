#!/bin/bash
echo "*** Updating"
sudo yum update -y
echo "*** Installing Git"
sudo yum install git -y
echo "*** Installing NVM"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
echo "*** Activating NVM"
. ~/.nvm/nvm.sh
echo "*** Installing node lts"
nvm install --lts
echo "*** Cloning repo"
git clone https://github.com/benjisoft/Archivord.git /home/archivord/Repo
echo "*** Setting perms"
sudo chmod -R 777 /home/archivord/Repo/
echo "*** Copying .env"
aws s3 cp s3://archivord-config/.env.prod /home/archivord/Repo/Archivord.Bot/.env
echo "*** Copying service account"
aws s3 cp s3://archivord-config/serviceAccount.json /home/archivord/Repo/Archivord.Bot/serviceAccount.json
echo "*** Navigating to repo"
cd /home/archivord/Repo/Archivord.Bot
echo "*** Intalling archivord deps"
npm ci
echo "*** Running archivord"
npm run dev

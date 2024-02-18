// INFO: This file defines the services that handle the connection between Archivord services and Discord. 
// It runs the bot as well as some configuration services for now.
terraform {
	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 5.37.0"
		}
	}
}

data "aws_ami" "amazon_linux" {
	most_recent = true
	filter {
		name   = "name"
		values = ["al2023-ami-2023.3.20240205.2-kernel-6.1-x86_64"]
	}
	owners = ["amazon"]
}

resource "aws_iam_policy" "archivordReadAccess" {
	name        = "archivordReadAccess"
	description = "Policy to allow read access to Archivord S3 bucket"
	policy = jsonencode({
		Version = "2012-10-17",
		Statement = [
			{
				Effect   = "Allow",
				Action   = [
					"s3:GetObject",
					"s3:ListBucket"
				],
				Resource = [
					"arn:aws:s3:::archivord-config/*",
					"arn:aws:s3:::archivord-config"
				]
			}
		]
	})

}

resource "aws_iam_role" "archivordReadAccess" {
	name = "archivordReadAccess"
	assume_role_policy = jsonencode({
		Version = "2012-10-17",
		Statement = [
			{
				Effect    = "Allow",
				Principal = {
					Service = "ec2.amazonaws.com"
				},
				Action    = "sts:AssumeRole"
			}
		]
	})
}

resource "aws_iam_role_policy_attachment" "archivordReadAccess" {
	policy_arn = aws_iam_policy.archivordReadAccess.arn
	role       = aws_iam_role.archivordReadAccess.name
}

resource "aws_iam_instance_profile" "archivordReadAccess" {
	name = "archivordReadAccess"
	role = aws_iam_role.archivordReadAccess.name
}

resource "aws_security_group" "home-ssh" {
  name        = "31CW SSH"
  description = "Allow SSH inbound traffic from 31CW"

  ingress {
	description = "SSH from personal"
	from_port   = 22
	to_port     = 22
	protocol    = "tcp"
	cidr_blocks = var.ipv4CIDRAllow
	ipv6_cidr_blocks  = var.ipv6CIDRAllow
  }

  egress {
	description = "All traffic"
	from_port   = 0
	to_port     = 0
	protocol    = "-1"
	cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_instance" "archivord-ingest" {
	ami           = data.aws_ami.amazon_linux.id
	instance_type = "t2.micro"

	user_data = <<-EOF
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
				EOF

	tags = {
		Name = "Archivord Prod"
		Environment = "production"
	}

	key_name = "Personal"
	vpc_security_group_ids = [aws_security_group.home-ssh.id]
	iam_instance_profile = aws_iam_instance_profile.archivordReadAccess.name
}
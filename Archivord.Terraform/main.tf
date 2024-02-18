terraform {
	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 5.37.0"
		}
	}
}

provider "aws" {
	alias = "London"
	region = "eu-west-2"
}

resource "aws_key_pair" "Personal" {
  key_name   = "deployer-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDV6yTFO7QqR3JpP2vFajQ2a4Q1oo1R5zR8aacJPC1itrVZYLu8tSsK/3nVxK9IWzIzXYA4V3WUJWTghhMm21FiRBL5iNoQvewvoTugJDEetK6+PFk3dAB9z7waPYi0RZ/SUtw1SsxQ+4VIoGJ1ssTkdzkjPLC2bND/hRdS7yyoPVZ5pcjhBB13lcXaPsSKWaOfH9jOsfDRECCX27EL74RF+gr9uD0eSaMw0hx+SoMKXr1jI5Vy3lcciO9NG8beO/8CQqzh8lY0UGOGyEfYTtWpBVsduF0cDCeihYM8mdN/ZC/hSV66Cuq76sCuaJJJcXdHbfMSGvPJABChoQnH34V9 Personal"
}

resource "aws_key_pair" "Home-PC" {
	key_name = "home-windows"
	public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDFK5DibMBL9hHt/JQD63rdcIPHA17iiPZnJMnU5CORn+00arp5m566JMiEsE2zmEDgBPM82Afl5pyU+/hZxro/pZFcD6tW6DBt1ysnWQRp6ZvSUJpraKjvUDeGtIvLjPz5JveczSQ+w0yxBB92ctt/9wiWwZ4YqriEL59PQV27Ct6XoELiPVEuz5sneGh5QAb5d6wUiVtswC2Itv5Zbyr5ZVoQh4Nebq8NJ3BR2Q89Pao6NHvj+ZeUelJIrn8ZsfZiksGCWXsjRWxqhBSnmlzfEqAp5iMb/2Br8uaD/V4/UGTrU5TFySk07bzI46eoaTmfr4RbzEDxht3neQMF52gNbNtL8ouFSoWpsDQqX7xHvYP9jZ+1lc/IiZHCUm1rgxE00D/bS1t4HYm8i+b6uzdtyDcb6DVXQMz0ugP/a8z4yJAF3QiVsXDzBq3ZHJeHrSSD9bSpuLN28lzW6yOiNaIULVdxzquE3ebb5ApdXL+N1Xj2R0v60EbTZUBfCGZNLCs= benji@Benji-PC"
}

module "ingestion" {
	source = "./modules/ingestion"
	providers = {
		aws = aws.London
	}
}

module "processing" {
	source = "./modules/processing"
	providers = {
		aws = aws.London
	}
}

module "supporting" {
	source = "./modules/supporting"
	providers = {
		aws = aws.London
	}
}
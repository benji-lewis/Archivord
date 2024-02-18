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
